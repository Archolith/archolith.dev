param(
    [string]$RemoteUser = "thron",
    [string]$RemoteHost = "147.93.132.141",
    [string]$RemotePath = "/var/www/html/archolith-dev",
    [switch]$AllowDirty,
    [switch]$PlanOnly,
    [switch]$SkipPrune
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$workspaceRoot = Resolve-Path (Join-Path $repoRoot "..\..\..")
$scpHelper = Join-Path $workspaceRoot "scripts\vps-scp.ps1"
$sshHelper = Join-Path $workspaceRoot "scripts\vps-ssh.ps1"
$payloadItems = @(
    "index.html",
    "privacy.html",
    "favicon.ico",
    "favicon.svg",
    "favicon-32x32.png",
    "fonts",
    "hero",
    "logos"
)

function Get-RemoteParent {
    param([string]$Path)

    $trimmed = $Path.TrimEnd("/")
    $lastSlash = $trimmed.LastIndexOf("/")
    if ($lastSlash -lt 1) {
        return "."
    }
    return $trimmed.Substring(0, $lastSlash)
}

function Get-RemoteLeaf {
    param([string]$Path)

    $trimmed = $Path.TrimEnd("/")
    $lastSlash = $trimmed.LastIndexOf("/")
    if ($lastSlash -lt 0) {
        return $trimmed
    }
    return $trimmed.Substring($lastSlash + 1)
}

Push-Location $repoRoot
try {
    $status = git status --porcelain
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read git status."
    }
    if ($status -and -not $AllowDirty) {
        throw "Working tree is dirty. Commit first, or rerun with -AllowDirty for an intentional test deploy."
    }

    $commit = (git rev-parse --short HEAD).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read git commit."
    }
    $branch = (git rev-parse --abbrev-ref HEAD).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to read git branch."
    }

    foreach ($item in $payloadItems) {
        $path = Join-Path $repoRoot $item
        if (-not (Test-Path -LiteralPath $path)) {
            throw "Missing deploy payload item: $item"
        }
    }

    $remoteLeaf = Get-RemoteLeaf $RemotePath
    $remoteParent = Get-RemoteParent $RemotePath
    $releaseRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("archolith-dev-deploy-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
    $payloadDir = Join-Path $releaseRoot $remoteLeaf
    New-Item -ItemType Directory -Path $payloadDir -Force | Out-Null

    foreach ($item in $payloadItems) {
        $source = Join-Path $repoRoot $item
        $destination = Join-Path $payloadDir $item
        Copy-Item -LiteralPath $source -Destination $destination -Recurse -Force
    }

    $manifest = [ordered]@{
        project = "archolith.dev"
        branch = $branch
        commit = $commit
        builtAtUtc = (Get-Date).ToUniversalTime().ToString("o")
        remotePath = $RemotePath
        caveat = "Deploy copies static files only; purge Cloudflare cache if changed JS/CSS must be visible immediately."
    }
    $manifest | ConvertTo-Json | Set-Content -Path (Join-Path $payloadDir "deploy-manifest.json") -Encoding UTF8

    # Enumerate every file in the payload as remote-relative paths. This drives the
    # prune step: anything on the VPS not in this list is stale and gets removed.
    # Written with LF endings and no BOM -- the remote `comm` compares literally, and
    # CRLF would make every line mismatch and delete the entire site.
    $payloadDirFull = (Resolve-Path $payloadDir).Path
    $fileList = @(Get-ChildItem -Path $payloadDirFull -Recurse -File | ForEach-Object {
        $_.FullName.Substring($payloadDirFull.Length).TrimStart("\", "/").Replace("\", "/")
    })
    $fileList += "deploy-files.txt"
    $fileList = $fileList | Sort-Object -Unique
    [System.IO.File]::WriteAllText(
        (Join-Path $payloadDir "deploy-files.txt"),
        (($fileList -join "`n") + "`n")
    )

    if ($fileList.Count -lt 2) {
        throw "Payload file list looks empty ($($fileList.Count) entries); refusing to deploy."
    }

    Write-Host "Prepared archolith.dev deploy payload:"
    Write-Host "  Commit: $commit ($branch)"
    Write-Host "  Local:  $payloadDir"
    Write-Host "  Remote: ${RemoteUser}@${RemoteHost}:$RemotePath"
    Write-Host "  Files:"
    foreach ($item in $payloadItems) {
        Write-Host "    - $item"
    }

    if ($PlanOnly) {
        Write-Host "PlanOnly set; not copying files."
        exit 0
    }

    if (-not (Test-Path -LiteralPath $scpHelper)) {
        throw "Missing VPS SCP helper: $scpHelper"
    }

    $remoteDestination = "${RemoteUser}@${RemoteHost}:$remoteParent/"
    & $scpHelper -Source $payloadDir -Destination $remoteDestination -Recurse
    if ($LASTEXITCODE -ne 0) {
        throw "SCP deploy failed with exit code $LASTEXITCODE."
    }

    Write-Host "Deploy copied to ${RemoteUser}@${RemoteHost}:$RemotePath"

    if (-not (Test-Path -LiteralPath $sshHelper)) {
        throw "Missing VPS SSH helper: $sshHelper"
    }

    # Post-upload hardening. scp leaves directories at 0700 and never removes files that
    # were deleted from the repo, so both are corrected here rather than by hand.
    $pruneFlag = if ($SkipPrune) { "0" } else { "1" }
    $remoteScript = @"
set -e
target='$RemotePath'
cd "`$target" || exit 1

if [ ! -f index.html ]; then
    echo 'ABORT: index.html missing after upload; leaving target untouched.' >&2
    exit 2
fi

if [ -d ./archolith-dev ]; then
    echo 'WARNING: nested archolith-dev/ directory detected -- scp nested the payload.' >&2
fi

if [ '$pruneFlag' = '1' ]; then
    if [ ! -s deploy-files.txt ]; then
        echo 'ABORT: deploy-files.txt missing or empty; refusing to prune.' >&2
        exit 3
    fi
    tmpdir=`$(mktemp -d)
    find . -type f -printf '%P\n' | LC_ALL=C sort > "`$tmpdir/actual"
    LC_ALL=C sort deploy-files.txt > "`$tmpdir/expected"
    comm -23 "`$tmpdir/actual" "`$tmpdir/expected" > "`$tmpdir/extra"
    pruned=0
    while IFS= read -r stale; do
        [ -n "`$stale" ] || continue
        rm -f "./`$stale"
        echo "  pruned: `$stale"
        pruned=`$((pruned + 1))
    done < "`$tmpdir/extra"
    find . -mindepth 1 -type d -empty -delete
    rm -rf "`$tmpdir"
    echo "Pruned `$pruned stale file(s)."
else
    echo 'Prune skipped (-SkipPrune).'
fi

find . -type d -exec chmod 755 {} +
find . -type f -exec chmod 644 {} +
rm -f deploy-files.txt
echo 'Permissions normalised to 755/644.'
"@

    $previousVpsHost = $env:YAWN_VPS_HOST
    $env:YAWN_VPS_HOST = "${RemoteUser}@${RemoteHost}"
    try {
        & $sshHelper $remoteScript
        if ($LASTEXITCODE -ne 0) {
            throw "Post-deploy hardening failed with exit code $LASTEXITCODE."
        }
    } finally {
        $env:YAWN_VPS_HOST = $previousVpsHost
    }

    Write-Host "If updated JS/CSS appears stale, purge Cloudflare cache for archolith.dev."
} finally {
    Pop-Location
}

param(
    [string]$RemoteUser = "thron",
    [string]$RemoteHost = "147.93.132.141",
    [string]$RemotePath = "/var/www/html/archolith-dev",
    [switch]$AllowDirty,
    [switch]$PlanOnly
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$workspaceRoot = Resolve-Path (Join-Path $repoRoot "..\..\..")
$scpHelper = Join-Path $workspaceRoot "scripts\vps-scp.ps1"
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
    Write-Host "If updated JS/CSS appears stale, purge Cloudflare cache for archolith.dev."
} finally {
    Pop-Location
}

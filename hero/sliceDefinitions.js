/* Live hero slice definitions. This static site has no TypeScript build step. */
(function defineArcholithSlices(globalScope) {
    var sliceDefinitions = [
        {
            id: "filter",
            layerId: "L0",
            name: "Filter",
            accent: "#c29b58",
            depth: "02m",
            measure: "50% avg compression",
            summary: "Tool output stripped before it reaches the model.",
            detail: "Layer 0 pre-filter pipeline removes secrets, binary, oversized blobs, and duplicate content. Nine format-switch strategies compress diffs, search results, JSON, logs, and stack traces.",
            note: "archolith-filter / compression engine"
        },
        {
            id: "proxy",
            layerId: "L1",
            name: "Proxy",
            accent: "#56a8e8",
            depth: "08m",
            measure: "launch evidence pending",
            summary: "Drop-in intercept. No code changes required.",
            detail: "OpenAI-compatible proxy. Point any harness at port 9800 with a base-URL swap. Owns the request lifecycle, session fingerprinting, two-pass curator assembly, and upstream forwarding.",
            note: "archolith-context / proxy layer"
        },
        {
            id: "context",
            layerId: "L2",
            name: "Context",
            accent: "#62a98c",
            depth: "15m",
            measure: "~15K token budget",
            summary: "Experimental graph-assembled context reduces linear replay.",
            detail: "Each turn can query the graph for active files, decisions, and relevant facts. Curated context is spliced in as synthetic messages when enabled; this layer is still experimental.",
            note: "archolith-context / experimental curator assembly"
        },
        {
            id: "memory",
            layerId: "L3",
            name: "Memory",
            accent: "#82729e",
            depth: "23m",
            measure: "promote > 0.90",
            summary: "Knowledge extracted and kept across sessions.",
            detail: "Entities, decisions, file structure, and code relationships are promoted to the long-term graph. Semantic retrieval surfaces the right context at the right turn without replay.",
            note: "menhir / knowledge graph"
        },
        {
            id: "audit",
            layerId: "L4",
            name: "Audit",
            accent: "#8eaed5",
            depth: "31m",
            measure: "per-server attribution",
            summary: "Measure waste before you compress it.",
            detail: "Per-server token cost, six waste pattern detectors, and report cards with concrete optimization suggestions. CI threshold gates catch regressions before they ship.",
            note: "archolith-skree / MCP diagnostics"
        },
        {
            id: "bench",
            layerId: "L5",
            name: "Bench",
            accent: "#a28670",
            depth: "39m",
            measure: "reproducible runs",
            summary: "Every headline number has a source.",
            detail: "Reproducible benchmark suite for proxy savings, filter compression, and audit waste reduction. Scenario runner, corpus compression, and stack comparison arms. Public claims stay tied to tracked evidence artifacts.",
            note: "archolith-peira / benchmark suite"
        }
    ];

    globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};
    globalScope.ArcholithHeroData.sliceDefinitions = sliceDefinitions;
})(window);

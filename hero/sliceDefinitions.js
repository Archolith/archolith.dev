/* Live hero slice definitions. This static site has no TypeScript build step. */
/* One slice per product. Slice `id` must match the plate-texture selector in
   archolith-hero.css: .strata-slice[data-slice-key="<id>"] .strata-slice__plate */
(function defineArcholithSlices(globalScope) {
    var sliceDefinitions = [
        {
            id: "menhir",
            layerId: "L0",
            name: "menhir",
            accent: "#82729e",
            depth: "02m",
            measure: "launch",
            summary: "Graph memory agents can actually recall from.",
            detail: "Long-term memory on Neo4j and Graphiti, served over MCP. Recall re-ranks on graph adjacency, recency, and prominence, not similarity alone. Indexes your code graph for blast radius and structure-aware retrieval, and compresses, decays, and flags contradictions on its own.",
            note: "menhir / graph memory"
        },
        {
            id: "filter",
            layerId: "L1",
            name: "archolith-filter",
            accent: "#c29b58",
            depth: "09m",
            measure: "50% avg compression",
            summary: "Tool output stripped before it reaches the model.",
            detail: "Layer 0 pre-filter pipeline removes secrets, binary, oversized blobs, and duplicate content. Nine format-switch strategies compress diffs, search results, JSON, logs, and stack traces.",
            note: "archolith-filter / compression engine"
        },
        {
            id: "audit",
            layerId: "L2",
            name: "archolith-skree",
            accent: "#8eaed5",
            depth: "17m",
            measure: "per-server attribution",
            summary: "Measure waste before you compress it.",
            detail: "Per-server token cost, six waste pattern detectors, and report cards with concrete optimization suggestions. CI threshold gates catch regressions before they ship.",
            note: "archolith-skree / MCP diagnostics"
        },
        {
            id: "bench",
            layerId: "L3",
            name: "archolith-peira",
            accent: "#a28670",
            depth: "25m",
            measure: "reproducible runs",
            summary: "Every headline number has a source.",
            detail: "Reproducible benchmark suite for recall quality, filter compression, and audit waste reduction. Scenario runner, corpus compression, and stack comparison arms. Public claims stay tied to tracked evidence artifacts.",
            note: "archolith-peira / benchmark suite"
        },
        {
            id: "proxy",
            layerId: "L4",
            name: "archolith-context (coming)",
            accent: "#56a8e8",
            depth: "33m",
            measure: "research direction",
            summary: "Curated context assembly at the request boundary.",
            detail: "An OpenAI-compatible proxy that would query the memory graph each turn and splice curated context in place of linear replay. Still experimental and not part of the launch.",
            note: "archolith-context / research direction"
        }
    ];

    globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};
    globalScope.ArcholithHeroData.sliceDefinitions = sliceDefinitions;
})(window);

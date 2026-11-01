/* Live hero slice definitions. This static site has no TypeScript build step. */
/* One slice per menhir layer. Slice `id` must match the plate-texture selector in
   archolith-hero.css: .strata-slice[data-slice-key="<id>"] .strata-slice__plate */
(function defineArcholithSlices(globalScope) {
    var sliceDefinitions = [
        {
            id: "memory",
            layerId: "L0",
            name: "memory",
            accent: "#82729e",
            depth: "02m",
            measure: "menhir v0.3.0",
            summary: "Long-term memory that keeps its sources.",
            detail: "Built on Neo4j and Graphiti, served over MCP. A background worker extracts entities, relationships and provenance."
        },
        {
            id: "state",
            layerId: "L1",
            name: "typed state",
            accent: "#56a8e8",
            depth: "09m",
            measure: "current + history",
            summary: "Current values, rebuilt from what was said.",
            detail: "A deterministic fold tracks changes and corrections. Some kinds are not checked against the source yet, so a value can be misread."
        },
        {
            id: "recall",
            layerId: "L2",
            name: "recall",
            accent: "#c29b58",
            depth: "17m",
            measure: "up to 4 graph signals",
            summary: "Similarity finds the candidates. The graph decides the order.",
            detail: "Hybrid BM25 and vector search supplies candidates. menhir reranks on signals like graph adjacency and recency."
        },
        {
            id: "codegraph",
            layerId: "L3",
            name: "code graph",
            accent: "#8eaed5",
            depth: "25m",
            measure: "blast radius",
            summary: "Recall that knows your code.",
            detail: "Index a project, then ask what a change touches. Pass file_context and memories anchored to that file join the candidates."
        },
        {
            id: "provenance",
            layerId: "L4",
            name: "provenance",
            accent: "#a28670",
            depth: "33m",
            measure: "get_provenance",
            summary: "Check where a fact came from.",
            detail: "get_provenance expands a memory or derived value into its source episodes, evidence and code anchors."
        }
    ];

    globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};
    globalScope.ArcholithHeroData.sliceDefinitions = sliceDefinitions;
})(window);

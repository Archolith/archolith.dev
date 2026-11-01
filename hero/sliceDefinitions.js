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
            detail: "Built on Neo4j and Graphiti, served over MCP. add_memory queues an episode and returns, then a background worker extracts entities and relationships and records scope and provenance. 62 tools, 9 resources, Apache-2.0.",
            note: "menhir / memory"
        },
        {
            id: "state",
            layerId: "L1",
            name: "typed state",
            accent: "#56a8e8",
            depth: "09m",
            measure: "current + history",
            summary: "Current values, rebuilt from what was said.",
            detail: "Statements become typed assertions with a source span. A deterministic fold rebuilds the current value through later changes and corrections. Some kinds are not checked against the source yet, so a value can be misread.",
            note: "menhir / typed state"
        },
        {
            id: "recall",
            layerId: "L2",
            name: "recall",
            accent: "#c29b58",
            depth: "17m",
            measure: "up to 4 graph signals",
            summary: "Similarity finds the candidates. The graph decides the order.",
            detail: "Hybrid BM25 and vector search supplies candidates. menhir reranks them on graph adjacency, recency, prominence and, when asked, unresolved conflict. Five presets shift the weights.",
            note: "menhir / recall"
        },
        {
            id: "codegraph",
            layerId: "L3",
            name: "code graph",
            accent: "#8eaed5",
            depth: "25m",
            measure: "blast radius",
            summary: "Recall that knows your code.",
            detail: "Index a project with ingest_project, then ask what a change touches. Pass file_context to a recall and memories anchored to that file join the candidates, even when the query wording misses them.",
            note: "menhir / code graph"
        },
        {
            id: "provenance",
            layerId: "L4",
            name: "provenance",
            accent: "#a28670",
            depth: "33m",
            measure: "get_provenance",
            summary: "Check where a fact came from.",
            detail: "get_provenance expands a memory or derived value into its source episodes, any attached evidence and its code anchors. Candidates wait for human approval, and superseded memories drop out of current recall by default.",
            note: "menhir / provenance"
        }
    ];

    globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};
    globalScope.ArcholithHeroData.sliceDefinitions = sliceDefinitions;
})(window);

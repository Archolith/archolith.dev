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
            summary: "Graph memory agents can actually recall from.",
            detail: "Long-term memory on Neo4j and Graphiti, served over MCP. add_memory queues an episode and returns, then a background worker extracts entities and relationships and records scope and provenance. 62 tools, 9 resources, Apache-2.0.",
            note: "menhir / memory"
        },
        {
            id: "recall",
            layerId: "L1",
            name: "recall",
            accent: "#c29b58",
            depth: "09m",
            measure: "up to 4 graph signals",
            summary: "Similarity finds the candidates. The graph decides the order.",
            detail: "Hybrid BM25 and vector search supplies candidates. menhir reranks them on graph adjacency, recency, prominence and, when asked, unresolved conflict. Five presets shift the weights.",
            note: "menhir / recall"
        },
        {
            id: "codegraph",
            layerId: "L2",
            name: "code graph",
            accent: "#8eaed5",
            depth: "17m",
            measure: "blast radius",
            summary: "Recall that knows your code.",
            detail: "Index a project with ingest_project, then ask what a change touches. Pass file_context to a recall and memories anchored to that file join the candidates, even when the query wording misses them.",
            note: "menhir / code graph"
        },
        {
            id: "governance",
            layerId: "L3",
            name: "governance",
            accent: "#a28670",
            depth: "25m",
            measure: "provenance",
            summary: "Stored text is not all equally trusted.",
            detail: "Candidates are withheld from recall until a human approves them. Superseded memories drop out of current recall by default, and get_provenance traces a memory back to its source episodes.",
            note: "menhir / governance"
        },
        {
            id: "lifecycle",
            layerId: "L4",
            name: "lifecycle",
            accent: "#56a8e8",
            depth: "33m",
            measure: "automatic expiry off",
            summary: "Inactive memories compress. Contradictions get flagged.",
            detail: "Daily maintenance runs consolidation and compresses eligible inactive memories, which can be rehydrated later. Deleting a memory is a manual, operator decision.",
            note: "menhir / lifecycle"
        }
    ];

    globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};
    globalScope.ArcholithHeroData.sliceDefinitions = sliceDefinitions;
})(window);

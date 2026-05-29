(function defineStrataSlice(globalScope) {
    var namespace = globalScope.ArcholithHeroComponents = globalScope.ArcholithHeroComponents || {};

    namespace.createStrataSlice = function createStrataSlice(definition, index) {
        var classes = ["strata-slice"];
        if (index === 0) {
            classes.push("is-active");
        }

        return [
            '<article class="', classes.join(" "), '" data-slice-key="', definition.id,
            '" data-layer-index="', index, '" style="--slice-accent:', definition.accent, ';">',
            '<div class="strata-slice__plate"></div>',
            '<div class="strata-slice__cutaway"></div>',
            '<div class="strata-slice__core"></div>',
            '<div class="strata-slice__scan"></div>',
            '<div class="strata-slice__meta">',
            '<span class="strata-slice__index">', definition.layerId, "</span>",
            '<span class="strata-slice__name">', definition.name, "</span>",
            '<span class="strata-slice__measure">', definition.measure, "</span>",
            "</div>",
            '<span class="strata-slice__depth">', definition.depth, "</span>",
            "",
            "</article>"
        ].join("");
    };
})(window);

(function defineStrataField(globalScope) {
    var namespace = globalScope.ArcholithHeroComponents = globalScope.ArcholithHeroComponents || {};

    function createScale(definitions) {
        return definitions.map(function mapScale(definition, index) {
            return [
                '<div class="strata-field__tick', index === 0 ? " is-active" : "", '" data-scale-index="', index, '">',
                '<span class="strata-field__tick-line"></span>',
                '<span class="strata-field__tick-label">', definition.layerId, "</span>",
                "</div>"
            ].join("");
        }).join("");
    }

    namespace.createStrataField = function createStrataField(definitions) {
        return [
            '<div class="strata-field" id="strata-field" data-active-layer="0">',
            '<div class="strata-field__survey strata-field__survey--top"></div>',
            '<div class="strata-field__wall" id="strata-wall">',
            definitions.map(function mapSlice(definition, index) {
                return namespace.createStrataSlice(definition, index);
            }).join(""),
            "</div>",
            '<div class="strata-field__marker" id="strata-marker">',
            '<span class="strata-field__marker-line"></span>',
            '<span class="strata-field__marker-label" id="seam-readout">L0 / surface</span>',
            "</div>",
            '<div class="strata-field__scale" aria-hidden="true">', createScale(definitions), "</div>",
            "</div>"
        ].join("");
    };
})(window);

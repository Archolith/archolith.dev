(function defineArcholithHero(globalScope) {
    var namespace = globalScope.ArcholithHeroComponents = globalScope.ArcholithHeroComponents || {};
    var dataStore = globalScope.ArcholithHeroData = globalScope.ArcholithHeroData || {};

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function renderMarkup(definitions) {
        var current = definitions[0];

        return [
            '<section class="archolith-hero-scroll" id="archolith-hero-scroll">',
            '<div class="archolith-hero-sticky" id="archolith-hero-sticky" style="--active-accent:', current.accent, ';">',
            '<div class="archolith-hero__copy">',
            '<div class="archolith-hero__brandplate">',
            '<div class="archolith-hero__logo-box">',
            '<img id="hero-logo" src="logos/05-strata-column.svg" alt="Archolith logo">',
            "</div>",
            '<div class="archolith-hero__brandcopy">',
            '<span class="archolith-hero__brand-kicker">open source / self-hosted / infrastructural memory</span>',
            '<span class="archolith-hero__brand-name" id="hero-logo-label">S5 · strata column</span>',
            "</div>",
            "</div>",
            '<span class="archolith-hero__crumb">Open source · Apache-2.0 · Self-hosted</span>',
            '<h1>Context <span class="accent">compressed</span>,<br>not replayed.</h1>',
            '<p class="archolith-hero__tagline">Self-hosted context compression for LLMs</p>',
            '<div class="archolith-hero__three-beat">',
            '<span class="archolith-hero__beat">Compress context</span>',
            '<span class="archolith-hero__beat">Extract knowledge</span>',
            '<span class="archolith-hero__beat">Remember everything</span>',
            "</div>",
            '<div class="archolith-hero__cta">',
            '<a class="cta" href="#demo">Try the demo</a>',
            '<a class="cta cta--ghost" href="https://github.com/archolith/archolith-proxy">View source</a>',
            "</div>",
            '<div class="archolith-hero__layer-card" id="archolith-layer-card">',
            '<div class="archolith-hero__layer-head">',
            '<span class="archolith-hero__layer-index" id="layer-idx">', escapeHtml(current.layerId), "</span>",
            '<span class="archolith-hero__layer-note" id="layer-note">', escapeHtml(current.note), "</span>",
            "</div>",
            '<div class="archolith-hero__layer-name" id="layer-nm">', escapeHtml(current.name), "</div>",
            '<p class="archolith-hero__layer-summary" id="layer-summary">', escapeHtml(current.summary), "</p>",
            '<p class="archolith-hero__layer-detail" id="layer-ds">', escapeHtml(current.detail), "</p>",
            '<div class="archolith-hero__layer-measure" id="layer-measure">', escapeHtml(current.measure), "</div>",
            "</div>",
            "</div>",
            '<div class="archolith-hero__visual">',
            '<div class="archolith-hero__cutface" aria-hidden="true">',
            '<span class="archolith-hero__cutface-label">survey cut</span>',
            '<span class="archolith-hero__cutface-rule"></span>',
            "</div>",
            namespace.createStrataField(definitions),
            "</div>",
            "</div>",
            "</section>"
        ].join("");
    }

    function bindScroll(root, definitions) {
        var scrollSection = root.querySelector("#archolith-hero-scroll");
        var stickySection = root.querySelector("#archolith-hero-sticky");
        var strataField = root.querySelector("#strata-field");
        var strataWall = root.querySelector("#strata-wall");
        var marker = root.querySelector("#strata-marker");
        var readout = root.querySelector("#seam-readout");
        var layerIndex = root.querySelector("#layer-idx");
        var layerName = root.querySelector("#layer-nm");
        var layerSummary = root.querySelector("#layer-summary");
        var layerDetail = root.querySelector("#layer-ds");
        var layerMeasure = root.querySelector("#layer-measure");
        var layerNote = root.querySelector("#layer-note");
        var layerCard = root.querySelector("#archolith-layer-card");
        var sliceNodes = Array.prototype.slice.call(root.querySelectorAll(".strata-slice"));
        var tickNodes = Array.prototype.slice.call(root.querySelectorAll(".strata-field__tick"));
        var count = definitions.length;
        var lastIndex = -1;
        var ticking = false;
        var markerRange = 0;

        function measure() {
            markerRange = Math.max(0, strataWall.offsetHeight - 10);
        }

        function updateVisualState(index) {
            var definition = definitions[index];
            if (!definition) {
                return;
            }

            stickySection.style.setProperty("--active-accent", definition.accent);
            strataField.setAttribute("data-active-layer", String(index));
            if (layerCard) {
                layerCard.style.borderColor = definition.accent;
            }

            sliceNodes.forEach(function applySliceState(node, sliceIndex) {
                node.classList.toggle("is-active", sliceIndex === index);
                node.classList.toggle("is-passed", sliceIndex < index);
            });

            tickNodes.forEach(function applyTickState(node, tickIndex) {
                node.classList.toggle("is-active", tickIndex === index);
                node.classList.toggle("is-passed", tickIndex < index);
            });

            layerIndex.textContent = definition.layerId;
            layerName.textContent = definition.name;
            layerSummary.textContent = definition.summary;
            layerDetail.textContent = definition.detail;
            layerMeasure.textContent = definition.measure;
            layerNote.textContent = definition.note;
            readout.textContent = definition.layerId + " / " + definition.id;
        }

        function update() {
            ticking = false;
            var rect = scrollSection.getBoundingClientRect();
            var scrollDistance = Math.max(1, scrollSection.offsetHeight - window.innerHeight);
            var offset = -rect.top;
            var progress = Math.max(0, Math.min(1, offset / scrollDistance));
            var index = Math.min(count - 1, Math.floor(progress * count));
            var markerPosition = progress * markerRange;

            marker.style.transform = "translateY(" + markerPosition.toFixed(2) + "px)";

            if (index === lastIndex) {
                return;
            }

            lastIndex = index;
            updateVisualState(index);
        }

        function onScroll() {
            if (ticking) {
                return;
            }

            ticking = true;
            window.requestAnimationFrame(update);
        }

        measure();
        updateVisualState(0);
        update();
        window.addEventListener("resize", function handleResize() {
            measure();
            update();
        });
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    globalScope.ArcholithHero = {
        mount: function mount(target) {
            var definitions = dataStore.sliceDefinitions || [];
            if (!target || !definitions.length) {
                return;
            }

            target.innerHTML = renderMarkup(definitions);
            bindScroll(target, definitions);
        }
    };
})(window);

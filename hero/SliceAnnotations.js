(function defineSliceAnnotations(globalScope) {
    var namespace = globalScope.ArcholithHeroComponents = globalScope.ArcholithHeroComponents || {};

    function wrap(definition, content) {
        return [
            '<svg class="slice-annotations" viewBox="0 0 1000 180" aria-hidden="true" preserveAspectRatio="none">',
            '<g class="slice-annotations__grid">',
            '<line x1="0" y1="28" x2="1000" y2="28"></line>',
            '<line x1="0" y1="152" x2="1000" y2="152"></line>',
            '<line x1="120" y1="0" x2="120" y2="180"></line>',
            '<line x1="820" y1="0" x2="820" y2="180"></line>',
            "</g>",
            content,
            '<text class="slice-annotations__caption" x="18" y="20">', definition.layerId, " / ", definition.id.toUpperCase(), "</text>",
            '<text class="slice-annotations__caption slice-annotations__caption--right" x="982" y="20">', definition.note.toUpperCase(), "</text>",
            "</svg>"
        ].join("");
    }

    function forSurface(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__minor">',
            '<path d="M40 42L310 64L520 78"></path>',
            '<path d="M40 64L300 84L516 90"></path>',
            '<path d="M40 86L292 98L492 104"></path>',
            '<path d="M40 108L284 112L468 116"></path>',
            "</g>",
            '<g class="slice-annotations__major">',
            '<line x1="522" y1="32" x2="522" y2="148"></line>',
            '<line x1="522" y1="58" x2="548" y2="58"></line>',
            '<line x1="522" y1="90" x2="560" y2="90"></line>',
            '<line x1="522" y1="122" x2="548" y2="122"></line>',
            '<path d="M565 90L720 90"></path>',
            '<path d="M740 62L816 90L740 118"></path>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="42" y="134">signal bands</text>',
            '<text x="572" y="80">compression gate</text>',
            '<text x="742" y="132">ordered ingress brief</text>',
            "</g>"
        ].join(""));
    }

    function forProxy(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__major">',
            '<path d="M34 90L236 90"></path>',
            '<rect x="238" y="58" width="118" height="64"></rect>',
            '<path d="M356 90L570 90"></path>',
            '<path d="M296 122L296 150L586 150L586 90"></path>',
            '<path d="M570 90L610 90L656 52L798 52"></path>',
            '<path d="M610 90L648 118L798 118"></path>',
            "</g>",
            '<g class="slice-annotations__minor">',
            '<line x1="84" y1="54" x2="84" y2="126"></line>',
            '<line x1="154" y1="54" x2="154" y2="126"></line>',
            '<line x1="420" y1="58" x2="420" y2="150"></line>',
            '<line x1="492" y1="58" x2="492" y2="150"></line>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="38" y="48">openai-compatible ingress</text>',
            '<text x="248" y="48">interception plate</text>',
            '<text x="590" y="166">graph briefing loop</text>',
            '<text x="684" y="44">upstream seam</text>',
            "</g>"
        ].join(""));
    }

    function forSession(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__major">',
            '<path d="M42 104L918 104"></path>',
            '<rect x="462" y="58" width="276" height="54"></rect>',
            '<path d="M158 44L158 104"></path>',
            '<path d="M252 36L252 104"></path>',
            '<path d="M336 28L336 104"></path>',
            '<path d="M462 84L412 52L336 52"></path>',
            "</g>",
            '<g class="slice-annotations__minor">',
            '<circle cx="158" cy="104" r="6"></circle>',
            '<circle cx="252" cy="104" r="6"></circle>',
            '<circle cx="336" cy="104" r="6"></circle>',
            '<circle cx="522" cy="84" r="6"></circle>',
            '<circle cx="600" cy="84" r="6"></circle>',
            '<circle cx="676" cy="84" r="6"></circle>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="40" y="44">working turns</text>',
            '<text x="474" y="48">assembly chamber</text>',
            '<text x="442" y="140">coherence tail</text>',
            '<text x="188" y="24">transient joins</text>',
            "</g>"
        ].join(""));
    }

    function forMemory(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__major">',
            '<path d="M120 128L212 64L336 98L472 54L618 86L760 48L880 76"></path>',
            '<path d="M212 64L188 34L120 40"></path>',
            '<path d="M472 54L462 22L548 22"></path>',
            '<path d="M760 48L760 20L868 20"></path>',
            "</g>",
            '<g class="slice-annotations__minor">',
            '<circle cx="120" cy="128" r="7"></circle>',
            '<circle cx="212" cy="64" r="7"></circle>',
            '<circle cx="336" cy="98" r="7"></circle>',
            '<circle cx="472" cy="54" r="8"></circle>',
            '<circle cx="618" cy="86" r="7"></circle>',
            '<circle cx="760" cy="48" r="9"></circle>',
            '<circle cx="880" cy="76" r="7"></circle>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="34" y="38">promotion trace</text>',
            '<text x="468" y="18">confidence &gt; .90</text>',
            '<text x="784" y="18">archival graph</text>',
            '<text x="272" y="146">engraved relationships</text>',
            "</g>"
        ].join(""));
    }

    function forFilter(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__major">',
            '<path d="M72 50L328 50L398 92L702 92L824 48"></path>',
            '<path d="M72 126L328 126L398 92"></path>',
            '<path d="M398 40L398 142"></path>',
            '<path d="M468 40L468 142"></path>',
            '<path d="M538 40L538 142"></path>',
            "</g>",
            '<g class="slice-annotations__minor">',
            '<rect x="86" y="60" width="162" height="18"></rect>',
            '<rect x="86" y="88" width="122" height="18"></rect>',
            '<rect x="590" y="74" width="132" height="18"></rect>',
            '<line x1="756" y1="72" x2="884" y2="72"></line>',
            '<line x1="756" y1="112" x2="884" y2="112"></line>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="82" y="40">candidate matter</text>',
            '<text x="416" y="30">threshold array</text>',
            '<text x="604" y="64">retained deltas</text>',
            '<text x="764" y="134">removed strata</text>',
            "</g>"
        ].join(""));
    }

    function forFoundation(definition) {
        return wrap(definition, [
            '<g class="slice-annotations__major">',
            '<path d="M52 120L932 120"></path>',
            '<path d="M112 38L112 148"></path>',
            '<path d="M236 38L236 148"></path>',
            '<path d="M360 38L360 148"></path>',
            '<path d="M484 38L484 148"></path>',
            '<path d="M608 38L608 148"></path>',
            '<path d="M732 38L732 148"></path>',
            '<path d="M856 38L856 148"></path>',
            '<path d="M52 68L932 68"></path>',
            "</g>",
            '<g class="slice-annotations__minor">',
            '<path d="M52 120L168 94L294 100L428 78L562 86L704 58L836 64"></path>',
            '<path d="M52 148L180 132L316 138L456 122L596 130L736 114L892 118"></path>',
            "</g>",
            '<g class="slice-annotations__labels">',
            '<text x="58" y="30">load-bearing schema rails</text>',
            '<text x="514" y="60">understructure grid</text>',
            '<text x="726" y="154">bedrock survey trace</text>',
            "</g>"
        ].join(""));
    }

    namespace.createSliceAnnotations = function createSliceAnnotations(definition) {
        switch (definition.id) {
            case "surface":
                return forSurface(definition);
            case "proxy":
                return forProxy(definition);
            case "session":
                return forSession(definition);
            case "memory":
                return forMemory(definition);
            case "filter":
                return forFilter(definition);
            case "foundation":
                return forFoundation(definition);
            default:
                return wrap(definition, "");
        }
    };
})(window);

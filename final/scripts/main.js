/* =========================================================
   main.js — entry point loaded by every page.
   Wires the hamburger and the language toggle, then applies
   the saved language immediately.
   ========================================================= */

import { initNav } from "./nav.js";
import { applyLang, setLang } from "./i18n.js";

function init() {
    initNav();

    document.querySelectorAll(".lang-toggle button").forEach((button) => {
        button.addEventListener("click", () => {
            setLang(button.dataset.lang);
        });
    });

    applyLang();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
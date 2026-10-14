/* =========================================================
   nav.js — hamburger menu
   Toggles the .open class on <nav> and keeps aria-expanded
   in sync. Escape closes and returns focus to the button.
   ========================================================= */

export function initNav() {
    const button = document.querySelector(".hamburger");
    const nav = document.querySelector("#site-nav");
    if (!button || !nav) return;

    button.addEventListener("click", () => {
        nav.classList.toggle("open");
        button.setAttribute(
            "aria-expanded",
            String(nav.classList.contains("open"))
        );
    });

    nav.addEventListener("keyup", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            nav.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            button.focus();
        }
    });

    // Close the menu if the viewport grows past the breakpoint,
    // so aria-expanded never lies about a hidden menu.
    const mq = window.matchMedia("(min-width: 700px)");
    mq.addEventListener("change", (event) => {
        if (event.matches) {
            nav.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        }
    });
}
/* =========================================================
   toolkit.js — Toolkit page behavior.
   Loads the tools, renders the category filters and the
   cards, handles clicks on filters, favorite stars and
   Details buttons, redraws on language change, and drives
   the accessible <dialog> detail modal.
   ========================================================= */

import { getTools } from "./data.js";
import { t, getLang } from "./i18n.js";
import { load, save } from "./storage.js";

let tools = [];
let activeCategory = "all";
let openTool = null;

// Guard against corrupted storage: if another page or a manual edit
// left something that isn't a list, fall back to an empty array.
const stored = load("adl-favorites", []);
let favorites = Array.isArray(stored) ? stored : [];

const filtersEl = document.querySelector(".filters");
const countEl = document.querySelector("#result-count");
const listEl = document.querySelector("#tool-list");
const dialog = document.querySelector("#tool-dialog");
const dialogTitle = document.querySelector("#tool-dialog-title");
const dialogBody = document.querySelector("#tool-dialog-body");
const dialogClose = dialog.querySelector(".dialog-close");

/* ---------- Helpers ---------- */

function languageName(code) {
    try {
        return new Intl.DisplayNames([getLang()], { type: "language" }).of(code);
    } catch {
        return code;
    }
}

function categoryLabel(key) {
    return t("category." + key);
}

function pricingLabel(key) {
    return t("pricing." + key);
}

function isFavorite(id) {
    return favorites.includes(id);
}

function toggleFavorite(id) {
    favorites = isFavorite(id)
        ? favorites.filter((fav) => fav !== id)
        : [...favorites, id];
    save("adl-favorites", favorites);
}

/* ---------- Filters ---------- */

function renderFilters() {
    filtersEl.querySelectorAll("button").forEach((btn) => btn.remove());

    if (tools.length === 0) return;

    const categories = [
        "all",
        ...new Set(tools.map((tool) => tool.category)),
        "favorites"
    ];

    categories.forEach((key) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.category = key;
        button.textContent = categoryLabel(key);
        button.setAttribute(
            "aria-pressed",
            key === activeCategory ? "true" : "false"
        );
        filtersEl.appendChild(button);
    });
}

/* ---------- Cards ---------- */

function cardHTML(tool) {
    const languages = tool.languages
        ? tool.languages.map(languageName).join(", ")
        : "";

    const bestUse = tool.bestUse ? tool.bestUse[getLang()] : "";

    const saved = isFavorite(tool.id);
    const starLabel = t(saved ? "card.unsave" : "card.save").replace(
        "{name}",
        tool.name
    );

    return `
        <article class="tool-card">
            <div class="tool-head">
                <h2>${tool.name}</h2>
                <button type="button" class="fav-button"
                        data-id="${tool.id}"
                        aria-pressed="${saved}"
                        aria-label="${starLabel}">${saved ? "★" : "☆"}</button>
            </div>
            <p class="tool-category">${categoryLabel(tool.category)}</p>
            <dl class="tool-meta">
                <dt>${t("card.pricing")}</dt>
                <dd>${pricingLabel(tool.pricing)}</dd>
                ${languages
            ? `<dt>${t("card.languages")}</dt><dd>${languages}</dd>`
            : ""
        }
            </dl>
            <p class="tool-best-use">${bestUse}</p>
            <div class="tool-actions">
                <button type="button" class="details-button" data-id="${tool.id}">
                    ${t("card.details")}
                </button>
                <a class="tool-link" href="${tool.url}" target="_blank" rel="noopener">
                    ${t("card.visit")}
                </a>
            </div>
        </article>
    `;
}

function renderTools() {
    if (tools.length === 0) {
        listEl.innerHTML = `<p class="toolkit-error">${t("toolkit.error")}</p>`;
        countEl.textContent = "";
        return;
    }

    const visible = tools.filter((tool) => {
        if (activeCategory === "all") return true;
        if (activeCategory === "favorites") return isFavorite(tool.id);
        return tool.category === activeCategory;
    });

    if (activeCategory === "favorites" && visible.length === 0) {
        listEl.innerHTML = `<p class="toolkit-empty">${t("toolkit.noFavorites")}</p>`;
        countEl.textContent = "";
        return;
    }

    listEl.innerHTML = visible.map(cardHTML).join("");

    const key =
        visible.length === 1 ? "toolkit.count.one" : "toolkit.count.other";
    countEl.textContent = t(key).replace("{n}", visible.length);
}

/* ---------- Dialog ---------- */

function dialogHTML(tool) {
    const languages = tool.languages
        ? tool.languages.map(languageName).join(", ")
        : "";

    const bestUse = tool.bestUse ? tool.bestUse[getLang()] : "";

    return `
        <p class="tool-category">${categoryLabel(tool.category)}</p>
        <dl class="tool-meta">
            <dt>${t("card.pricing")}</dt>
            <dd>${pricingLabel(tool.pricing)}</dd>
            ${languages
            ? `<dt>${t("card.languages")}</dt><dd>${languages}</dd>`
            : ""
        }
        </dl>
        <p>${bestUse}</p>
        <a class="tool-link" href="${tool.url}" target="_blank" rel="noopener">
            ${t("card.visit")}
        </a>
    `;
}

function openDialog(tool) {
    openTool = tool;
    dialogTitle.textContent = tool.name;
    dialogBody.innerHTML = dialogHTML(tool);
    dialogClose.setAttribute("aria-label", t("dialog.close"));
    dialog.showModal();
}

function refreshDialog() {
    if (!openTool || !dialog.open) return;
    dialogTitle.textContent = openTool.name;
    dialogBody.innerHTML = dialogHTML(openTool);
    dialogClose.setAttribute("aria-label", t("dialog.close"));
}

/* ---------- Events ---------- */

filtersEl.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderFilters();
    renderTools();
});

listEl.addEventListener("click", (event) => {
    const detailsBtn = event.target.closest(".details-button");
    if (detailsBtn) {
        const tool = tools.find((item) => item.id === detailsBtn.dataset.id);
        if (tool) openDialog(tool);
        return;
    }

    const favBtn = event.target.closest(".fav-button");
    if (!favBtn) return;

    const id = favBtn.dataset.id;
    toggleFavorite(id);
    renderTools();

    const sameStar = listEl.querySelector(`[data-id="${id}"]`);
    const firstStar = listEl.querySelector(".fav-button");
    const activeFilter = filtersEl.querySelector('[aria-pressed="true"]');

    (sameStar || firstStar || activeFilter)?.focus();
});

dialogClose.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

    if (!inside) dialog.close();
});

document.addEventListener("languagechange", () => {
    renderFilters();
    renderTools();
    refreshDialog();
});

/* ---------- Start-up ---------- */

async function init() {
    tools = await getTools();

    // Read ?category=… from the URL, so the Home page can deep-link
    // into a specific filter. Only accept a real category.
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("category");
    const valid = ["all", "favorites", ...new Set(tools.map((tool) => tool.category))];
    if (requested && valid.includes(requested)) {
        activeCategory = requested;
    }

    renderFilters();
    renderTools();
}

init();
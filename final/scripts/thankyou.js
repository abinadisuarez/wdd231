/* =========================================================
   thankyou.js — reads the consultation form submission from
   the URL and displays it. Values are inserted with
   textContent (never innerHTML), because they come from the
   query string and a visitor could put anything there.
   ========================================================= */

import { t, getLang } from "./i18n.js";

const params = new URLSearchParams(window.location.search);
const resultsEl = document.querySelector("#results");
const titleEl = document.querySelector("#thanks-title");

// [labelKey, paramName] pairs, in the order the form lists them.
const fields = [
    ["form.firstName", "firstName"],
    ["form.lastName", "lastName"],
    ["form.email", "email"],
    ["form.phone", "phone"],
    ["form.business", "business"],
    ["form.topic", "topic"],
    ["form.language", "language"],
    ["form.message", "message"]
];

// Only values we know how to translate. Anything else falls back
// to the raw value, so an unknown key never leaks to the page.
const KNOWN_TOPICS = ["email", "social", "funnels", "ai"];

function topicLabel(value) {
    if (value === "other") return t("topic.other");
    if (KNOWN_TOPICS.includes(value)) return t("category." + value);
    return value;
}

function languageLabel(value) {
    if (value === "en") return "English";
    if (value === "es") return "Español";
    return value;
}

function displayValue(key, value) {
    const v = (value || "").trim();
    if (v === "") return t("thankyou.notProvided");
    if (key === "form.topic") return topicLabel(v);
    if (key === "form.language") return languageLabel(v);
    return v;
}

function render() {
    // Greeting: use the named template when a first name is present,
    // so punctuation lands naturally in both languages.
    const firstName = (params.get("firstName") || "").trim();
    titleEl.textContent = firstName
        ? t("thankyou.titleNamed").replace("{name}", firstName)
        : t("thankyou.title");

    // If the URL has no query string at all, show the empty state.
    const hasAny = Array.from(params.keys()).length > 0;
    if (!hasAny) {
        resultsEl.replaceChildren();
        const p = document.createElement("p");
        p.className = "results-empty";
        p.textContent = t("thankyou.empty");
        resultsEl.appendChild(p);
        return;
    }

    // Rebuild the dl from scratch on every render (initial + language change).
    const fragment = document.createDocumentFragment();

    fields.forEach(([labelKey, paramName]) => {
        const dt = document.createElement("dt");
        dt.textContent = t(labelKey);

        const dd = document.createElement("dd");
        dd.textContent = displayValue(labelKey, params.get(paramName));
        if (paramName === "message") dd.classList.add("results-message");

        fragment.append(dt, dd);
    });

    resultsEl.replaceChildren(fragment);
}

render();
document.addEventListener("languagechange", render);
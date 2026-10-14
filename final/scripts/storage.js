/* =========================================================
   storage.js — safe localStorage wrapper
   Private browsing or blocked storage can throw; never crash.
   ========================================================= */

export function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage unavailable: the site still works, just without memory */
    }
}
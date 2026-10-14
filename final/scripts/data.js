/* =========================================================
   data.js — loads the tool data from the local JSON file.
   fetch does not throw on a 404, so we check response.ok
   and throw ourselves. Callers get [] on any failure.
   ========================================================= */

export async function getTools() {
    try {
        const response = await fetch("data/tools.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        return data.tools;
    } catch (error) {
        console.error("Could not load the tools:", error);
        return [];
    }
}
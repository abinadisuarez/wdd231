import { places } from "../data/discover.mjs";

const container = document.querySelector("#places");

places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("place-card");

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
            <figcaption>Photo: ${place.credit} (${place.license})</figcaption>
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">Learn more</button>
    `;

    container.append(card);
});

/* ---------- Visit message ---------- */
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit"); // null the first time
const now = Date.now();

if (lastVisit === null) {
    // 1) First visit
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const difference = now - Number(lastVisit);
    const msPerDay = 1000 * 60 * 60 * 24;

    if (difference < msPerDay) {
        // 2) Back within one day
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        // 3) One day or more
        const days = Math.floor(difference / msPerDay);
        const dayWord = days === 1 ? "day" : "days";
        visitMessage.textContent = `You last visited ${days} ${dayWord} ago.`;
    }
}

localStorage.setItem("lastVisit", now); // LAST, after reading the old value
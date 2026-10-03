const myInfo = new URLSearchParams(window.location.search);
const results = document.querySelector("#results");

const fields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email", "email"],
    ["Mobile Phone", "phone"],
    ["Business", "business"],
    ["Submitted", "timestamp"]
];

fields.forEach(([label, name]) => {
    let value = myInfo.get(name) ?? "";

    if (name === "timestamp" && value) {
        const date = new Date(value);
        if (!isNaN(date)) {
            value = date.toLocaleString();
        }
    }

    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    results.append(p);
});
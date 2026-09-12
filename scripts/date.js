const yearSpan = document.querySelector('#currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector('#lastModified');
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
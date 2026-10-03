const timestampInput = document.querySelector("#timestamp");
const now = new Date();

timestampInput.value = now.toISOString();

// Open a modal
document.querySelectorAll(".learn-more").forEach(button => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.modal);
        dialog.showModal();
    });
});

// Close with the X button
document.querySelectorAll(".close-modal").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

// Close by clicking outside the box
document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
        const rect = dialog.getBoundingClientRect();
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
});
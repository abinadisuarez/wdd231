const hamburger = document.querySelector('#hamburger');
const primaryNav = document.querySelector('#primaryNav');

hamburger.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

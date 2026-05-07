// =========================
// DOM ELEMENTS
// =========================

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const menuIcon = document.querySelector('.menu-icon');

// =========================
// MOBILE MENU
// =========================

const closeMenu = () => {
    mobileNav.classList.remove('active');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuIcon.textContent = '☰';
};

const openMenu = () => {
    mobileNav.classList.add('active');
    menuButton.classList.add('active');
    menuButton.setAttribute('aria-expanded', 'true');
    menuIcon.textContent = '✖';
};

if (menuButton && mobileNav && menuIcon) {
    menuButton.addEventListener('click', function (event) {
        event.stopPropagation();

        const isOpen = mobileNav.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
        const clickedButton = menuButton.contains(event.target);
        const clickedNav = mobileNav.contains(event.target);

        if (!clickedButton && !clickedNav) {
            closeMenu();
        }
    });
}
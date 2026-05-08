// =========================
// DOM ELEMENTS
// =========================

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const menuIcon = document.querySelector('.menu-icon');
const header = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('.reveal');

// =========================
// MOBILE MENU
// =========================

const closeMenu = () => {
    if (!mobileNav || !menuButton || !menuIcon) return;
    mobileNav.classList.remove('active');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuIcon.textContent = '☰';
};

const openMenu = () => {
    if (!mobileNav || !menuButton || !menuIcon) return;
    mobileNav.classList.add('active');
    menuButton.classList.add('active');
    menuButton.setAttribute('aria-expanded', 'true');
    menuIcon.textContent = '✖';
};

if (menuButton && mobileNav && menuIcon) {
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const isOpen = mobileNav.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        const clickedButton = menuButton.contains(event.target);
        const clickedNav = mobileNav.contains(event.target);

        if (!clickedButton && !clickedNav) {
            closeMenu();
        }
    });
}

// =========================
// HEADER SCROLL EFFECT
// =========================

const handleHeaderScroll = () => {
    if (!header) return;

    const shouldScroll = window.scrollY > 50;

    header.classList.toggle('scrolled', shouldScroll);
};

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

// =========================
// SCROLL REVEAL
// =========================

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((element, index) => {

        element.style.transitionDelay = `${index * 0.1}s`;

        revealObserver.observe(element);

    });
}
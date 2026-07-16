// =========================
// DOM ELEMENTS
// =========================

/* Mobile menu elements */
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const menuIcon = document.querySelector('.menu-icon');

/* Header and scroll reveal elements */
const header = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('.reveal');

/* Gallery lightbox elements */
const galleryImages = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

/* Join form elements */
const joinForm = document.getElementById('join-form');
const nameInput = document.getElementById('member-name');
const emailInput = document.getElementById('member-email');
const genreInput = document.getElementById('game-genre');
const messageInput = document.getElementById('member-message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const genreError = document.getElementById('genre-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('form-success');

/* Event filter elements */
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

/* Coutntdown timer elements */
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

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

// =========================
// GALLERY LIGHTBOX
// =========================

let currentImageIndex = 0;
let lastFocusedElement = null;

const showLightboxImage = (index) => {
    const selectedImage = galleryImages[index];

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    lightboxCaption.textContent = selectedImage.dataset.caption;

    currentImageIndex = index;
};

const openLightbox = (index) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    lastFocusedElement = document.activeElement;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    showLightboxImage(index);
    lightboxClose.focus();
};

const closeLightbox = () => {
    if (!lightbox) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if(lastFocusedElement) {
        lastFocusedElement.focus();
    }
};

const showPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightboxImage(prevIndex);
};

const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    showLightboxImage(nextIndex);
};

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        openLightbox(index);
    });

    image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openLightbox(index);
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    const focusableElements = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Escape') {
        closeLightbox();
    }
    if (event.key === 'ArrowLeft') {
        showPrevImage();
    }
    if (event.key === 'ArrowRight') {
        showNextImage();
    }

    if (event.key === 'Tab') {
        if(event.shiftKey && document.activeElement === firstElement) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

// =========================
// JOIN FORM VALIDATION
// =========================

// Helper functions 
const showError = (input, errorElement, message) => {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    errorElement.textContent = message;
};

const showSuccess = (input, errorElement) => {
    input.classList.remove('input-error');
    input.classList.add('input-success');
    errorElement.textContent = '';
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Form submission handler 
if (joinForm) {
    joinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;
        formSuccess.textContent = '';

        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name.');
            isFormValid = false;
        } else {
            showSuccess(nameInput, nameError);
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email.');
            isFormValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isFormValid = false;
        } else {
            showSuccess(emailInput, emailError);
        }

        if (genreInput.value === '') {
            showError(genreInput, genreError, 'Please choose a game genre.');
            isFormValid = false;
        } else {
            showSuccess(genreInput, genreError);
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Please write at least 10 characters.');
            isFormValid = false;
        } else {
            showSuccess(messageInput, messageError);
        }

        if (isFormValid) {
            formSuccess.textContent = 'Application submitted successfully. Welcome to ShadowPixel!';
            joinForm.reset();

            [nameInput, emailInput, genreInput, messageInput].forEach((input) => {
                input.classList.remove('input-success');
            });
        }
    });
}

// Real-time validation
if (joinForm) {
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name.');
        } else {
            showSuccess(nameInput, nameError);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
        } else {
            showSuccess(emailInput, emailError);
        }
    });

    genreInput.addEventListener('change', () => {
        if (genreInput.value === '') {
            showError(genreInput, genreError, 'Please choose a game genre.');
        } else {
            showSuccess(genreInput, genreError);
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Please write at least 10 characters.');
        } else {
            showSuccess(messageInput, messageError);
        }
    });
}

// =========================
// EVENTS FILTERING
// =========================

if (filterButtons.length > 0 && eventCards.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((btn) => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            eventCards.forEach((card) => {
                const cardCategory = card.dataset.category;

                if (selectedFilter === 'all' || selectedFilter === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// =========================
// COUNTDOWN TIMER
// =========================

if (daysElement && hoursElement && minutesElement && secondsElement) {
    const countdownDate = new Date('November 15, 2026 18:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);

            document.querySelector('.countdown').innerHTML = `
                <p class="countdown-finished">
                    🎉 The Tournament Has Started!
                </p>
            `;

            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);
}
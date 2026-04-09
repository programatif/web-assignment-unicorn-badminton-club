// Open flyout/sidebar menu on mobile when hamburger button is pressed
const menuIcon = document.getElementById('mobile-menu-icon');
const flyout = document.getElementById('mobile-flyout');

if (menuIcon && flyout) {
    menuIcon.addEventListener('click', () => {
        flyout.classList.toggle('open');
        menuIcon.classList.toggle('active');
    });
}

// Accessibility Settings
const themes = [
    { name: 'light', icon: 'bi-sun-fill' },
    { name: 'dark', icon: 'bi-moon-stars-fill' }
];

const fontSizes = [
    { name: 'text-sm', icon: 'bi-type', label: 'Small' },
    { name: 'text-base', icon: 'bi-type', label: 'Normal' },
    { name: 'text-xl', icon: 'bi-type-h1', label: 'Large' }
];

function applySetting(storageKey, list, val) {
    const state = list[val];

    // Remove all possible classes for this category
    list.forEach(item => document.documentElement.classList.remove(item.name));

    document.documentElement.classList.add(state.name);

    if (storageKey === 'theme') {
        document.documentElement.setAttribute('data-theme', state.name);
    }

    // Save to localStorage
    localStorage.setItem(storageKey, val);

    // Update the icon in the UI
    const iconId = `${storageKey}-icon`;
    const icon = document.getElementById(iconId);
    if (icon) {
        icon.className = `bi ${state.icon}`;
    }
}

// Sets up the click listener for cycling through settings
function setupCycle(btnId, storageKey, list, val) {
    const btn = document.getElementById(btnId);
    if (!btn) return val;

    btn.addEventListener('click', () => {
        val = (val + 1) % list.length;
        applySetting(storageKey, list, val);
    });

    return val;
}

// Load initial values from localStorage (defaulting to light mode and normal font)
let themeVal = parseInt(localStorage.getItem('theme')) || 0;
let fontVal = parseInt(localStorage.getItem('font')) || 1;

// Apply saved settings on page load
applySetting('theme', themes, themeVal);
applySetting('font', fontSizes, fontVal);

themeVal = setupCycle('theme-cycle', 'theme', themes, themeVal);
fontVal = setupCycle('font-cycle', 'font', fontSizes, fontVal);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section
gsap.from("#hero-text > *", {
    duration: 1,
    x: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Section Header
const titles = document.querySelectorAll('.title');
titles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out"
    });
});

// Committee Cards
gsap.from("#committee-members .card", {
    scrollTrigger: {
        trigger: "#meet-committee",
        start: "top 70%",
    },
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// Contact Form
gsap.from("#form-wrapper", {
    scrollTrigger: {
        trigger: "#contact-form-find-us",
        start: "top 80%",
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: "power3.out"
});

// Image Carousel
gsap.to("#club-img-carousel img", {
    scrollTrigger: {
        trigger: "#club-img-carousel",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    },
    x: -50,
    ease: "none"
});
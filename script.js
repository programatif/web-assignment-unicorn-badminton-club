// Open flyout/sidebar menu on mobile when hamburger button is pressed
const menuIcon = document.getElementById('mobile-menu-icon');
const flyout = document.getElementById('mobile-flyout');

menuIcon.addEventListener('click', () => {
    flyout.classList.toggle('open');
    menuIcon.classList.toggle('active');
});


const themes = [
    { name: 'system', icon: 'bi-display' },
    { name: 'light', icon: 'bi-sun-fill' },
    { name: 'dark', icon: 'bi-moon-stars-fill' }
];

const fontSizes = [
    { name: 'text-sm', icon: 'bi-type', label: 'Small' },
    { name: 'text-base', icon: 'bi-type', label: 'Normal' },
    { name: 'text-xl', icon: 'bi-type-h1', label: 'Large' }
];

const contrasts = [
    { name: 'normal', icon: 'bi-circle-half' },
    { name: 'high-contrast', icon: 'bi-circle-fill' }
];

let themeIdx = 0;
let fontIdx = 1;
let contrastIdx = 0;

function updateCycle(btnId, iconId, list, currentIdx, storageKey, callback) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);

    btn.addEventListener('click', () => {
        document.documentElement.classList.remove(list[currentIdx].name);

        currentIdx = (currentIdx + 1) % list.length;

        const state = list[currentIdx];
        if (state.name !== 'system' && state.name !== 'normal') {
            document.documentElement.classList.add(state.name);
        }

        if (storageKey === 'theme') {
            document.documentElement.setAttribute('data-theme', state.name === 'system' ? '' : state.name);
        }

        icon.className = `bi ${state.icon}`;
        callback(currentIdx);
    });
}

updateCycle('theme-cycle', 'theme-icon', themes, themeIdx, 'theme', (idx) => themeIdx = idx);
updateCycle('font-cycle', 'font-icon', fontSizes, fontIdx, 'font', (idx) => fontIdx = idx);
updateCycle('contrast-cycle', 'contrast-icon', contrasts, contrastIdx, 'contrast', (idx) => contrastIdx = idx);
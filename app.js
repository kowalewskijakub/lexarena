// BUBA App — Main router and state management
import { renderLanding, initLanding } from './landing.js';
import { renderDashboard, initDashboard } from './dashboard.js';
import { renderArenaLevels, initArenaLevels } from './arena-levels.js';
import { renderGame, initGame } from './game.js';
import { renderLeaderboard, initLeaderboard } from './leaderboard.js';
import { mockUser } from './data.js';

const pages = {
    landing: { render: renderLanding, init: initLanding },
    dashboard: { render: renderDashboard, init: initDashboard },
    arena: { render: renderArenaLevels, init: initArenaLevels },
    game: { render: renderGame, init: initGame },
    leaderboard: { render: renderLeaderboard, init: initLeaderboard },
};

function getPage() {
    const hash = window.location.hash.replace('#', '') || 'landing';
    return pages[hash] ? hash : 'landing';
}

function navigate() {
    const page = getPage();
    const main = document.getElementById('main-content');
    const { render, init } = pages[page];

    // Fade out
    main.style.opacity = '0';
    setTimeout(() => {
        main.innerHTML = render();
        init();
        main.style.opacity = '1';
        window.scrollTo(0, 0);
    }, 150);

    // Update nav — game is a sub-page of arena
    const navPage = page === 'game' ? 'arena' : page;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === navPage);
    });

    // Show/hide navbar user info but keep layout stable
    const navUser = document.getElementById('navbar-user');
    if (navUser) {
        navUser.style.visibility = page === 'landing' ? 'hidden' : 'visible';
        navUser.style.opacity = page === 'landing' ? '0' : '1';
    }

    // Update XP in nav
    document.getElementById('nav-xp').textContent = mockUser.xp.toLocaleString();
}

// Smooth fade transition
document.getElementById('main-content').style.transition = 'opacity 0.15s ease';

// Hash routing
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

// Mobile menu toggle
document.getElementById('navbar-toggle')?.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.toggle('open');
});

// Toast utility
window.showToast = function (msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// Init
navigate();

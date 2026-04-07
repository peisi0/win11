/* ========================================
   Windows 11 Simulator - Enhanced Script
   ======================================== */

// State Management
const state = {
    currentBackground: 1,
    totalBackgrounds: 4,
    isStartMenuOpen: false,
    isQuickActionsOpen: false,
    theme: 'light',
    volume: 75,
    brightness: 100
};

// DOM Elements
const elements = {};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeClock();
    setupEventListeners();
    loadSavedSettings();
    showBootAnimation();
});

// Cache DOM elements
function initializeElements() {
    elements.startMenu = document.getElementById('startMenu');
    elements.startButton = document.querySelector('.start-button');
    elements.quickActions = document.getElementById('quickActions');
    elements.contextMenu = document.getElementById('contextMenu');
    elements.timeDisplay = document.getElementById('time');
    elements.dateDisplay = document.getElementById('date');
    elements.audio = document.getElementById('audio');
    elements.notification = document.getElementById('notification');
}

// Boot animation
function showBootAnimation() {
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.remove('loading');
        showNotification('Windows 11', 'Welcome to Windows 11 Simulator!', 'info');
    }, 1500);
}

// Clock System
function initializeClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    
    // Format time with seconds
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    if (elements.timeDisplay) {
        elements.timeDisplay.textContent = now.toLocaleTimeString('zh-CN', timeOptions);
    }
    
    // Format date
    const dateOptions = { month: 'numeric', day: 'numeric', weekday: 'short' };
    if (elements.dateDisplay) {
        elements.dateDisplay.textContent = now.toLocaleDateString('zh-CN', dateOptions);
    }
}

// Event Listeners
function setupEventListeners() {
    // Global click handler
    document.addEventListener('click', handleGlobalClick);
    
    // Context menu
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Clock click - go to clock page
    const clock = document.getElementById('clock');
    if (clock) {
        clock.addEventListener('click', () => {
            window.location.href = 'clock/';
        });
    }
}

// Global click handler
function handleGlobalClick(event) {
    const target = event.target;
    
    // Close menus if clicking outside
    if (!target.closest('.start-menu') && !target.closest('.start-button')) {
        closeStartMenu();
    }
    
    if (!target.closest('.quick-actions') && !target.closest('#clock')) {
        closeQuickActions();
    }
    
    closeContextMenu();
}

// Keyboard shortcuts
function handleKeyboard(event) {
    // Windows key - toggle start menu
    if (event.key === 'Meta' || (event.ctrlKey && event.key === 'Escape')) {
        event.preventDefault();
        toggleStartMenu();
    }
    
    // Escape - close all menus
    if (event.key === 'Escape') {
        closeAllMenus();
    }
}

// Handle resize
function handleResize() {
    closeAllMenus();
}

// Start Menu
function toggleStartMenu() {
    state.isStartMenuOpen = !state.isStartMenuOpen;
    
    if (elements.startMenu) {
        elements.startMenu.classList.toggle('show', state.isStartMenuOpen);
    }
    
    if (elements.startButton) {
        elements.startButton.classList.toggle('active', state.isStartMenuOpen);
    }
    
    // Close other menus
    if (state.isStartMenuOpen) {
        closeQuickActions();
    }
}

function closeStartMenu() {
    state.isStartMenuOpen = false;
    if (elements.startMenu) {
        elements.startMenu.classList.remove('show');
    }
    if (elements.startButton) {
        elements.startButton.classList.remove('active');
    }
}

// Quick Actions
function toggleQuickActions() {
    state.isQuickActionsOpen = !state.isQuickActionsOpen;
    
    if (elements.quickActions) {
        elements.quickActions.classList.toggle('show', state.isQuickActionsOpen);
    }
    
    if (state.isQuickActionsOpen) {
        closeStartMenu();
    }
}

function closeQuickActions() {
    state.isQuickActionsOpen = false;
    if (elements.quickActions) {
        elements.quickActions.classList.remove('show');
    }
}

// Context Menu
function handleContextMenu(event) {
    event.preventDefault();
    
    const menu = elements.contextMenu;
    if (!menu) return;
    
    // Position menu
    const x = Math.min(event.clientX, window.innerWidth - 220);
    const y = Math.min(event.clientY, window.innerHeight - 300);
    
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    
    // Show menu
    requestAnimationFrame(() => {
        menu.classList.add('show');
    });
}

function closeContextMenu() {
    if (elements.contextMenu) {
        elements.contextMenu.classList.remove('show');
    }
}

// Close all menus
function closeAllMenus() {
    closeStartMenu();
    closeQuickActions();
    closeContextMenu();
}

// Background System
function changeBackground() {
    state.currentBackground = (state.currentBackground % state.totalBackgrounds) + 1;
    document.body.style.backgroundImage = `url('assets/background/bg${state.currentBackground}.png')`;
    
    // Save preference
    localStorage.setItem('win11-bg', state.currentBackground);
    
    showNotification('Background', `Background changed to ${state.currentBackground}`, 'success');
    return false;
}

function setBackground(index) {
    state.currentBackground = index;
    document.body.style.backgroundImage = `url('assets/background/bg${index}.png')`;
    localStorage.setItem('win11-bg', index);
    closeContextMenu();
}

// Theme System
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('win11-theme', state.theme);
    
    const icon = document.querySelector('.theme-toggle svg');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Window Functions
function openNewWindow(url, title = 'Window') {
    const width = 900;
    const height = 650;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    window.open(
        url, 
        title,
        `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
    );
    
    closeStartMenu();
    return false;
}

// Specific window openers
function openAppStore() {
    return openNewWindow('https://apps.microsoft.com/', 'App Store');
}

function openAnnouncement() {
    return openNewWindow('https://AL-sama0.github.io/announcement/', 'Announcement');
}

function openArduino() {
    return openNewWindow('https://wokwi.com/projects/new/arduino-mega/', 'Arduino');
}

function openArduinoFolder() {
    return openNewWindow('https://AL-sama0.github.io/arduino/', 'Arduino Projects');
}

function openGoogle() {
    return openNewWindow('https://google.com/', 'Google');
}

function openPoe() {
    return openNewWindow('https://poe.com/', 'Poe AI');
}

function openUnderia() {
    return openNewWindow('https://github.com/KLPig/underia', 'Underia');
}

// Audio System
function playSound() {
    const audio = elements.audio;
    if (!audio) return false;
    
    const soundIcon = document.querySelector('.sound-icon');
    
    if (audio.paused) {
        audio.play();
        if (soundIcon) soundIcon.classList.add('audio-playing');
    } else {
        audio.pause();
        audio.currentTime = 0;
        if (soundIcon) soundIcon.classList.remove('audio-playing');
    }
    
    return false;
}

function setVolume(value) {
    state.volume = value;
    if (elements.audio) {
        elements.audio.volume = value / 100;
    }
    localStorage.setItem('win11-volume', value);
}

// Notification System
function showNotification(title, message, type = 'info') {
    const notification = elements.notification;
    if (!notification) return;
    
    const titleEl = notification.querySelector('h4');
    const messageEl = notification.querySelector('p');
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    
    // Set icon color based on type
    const iconContainer = notification.querySelector('.notification-icon');
    if (iconContainer) {
        const colors = {
            info: '#0078d4',
            success: '#107c10',
            warning: '#ffb900',
            error: '#d13438'
        };
        iconContainer.style.background = colors[type] || colors.info;
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Settings
function loadSavedSettings() {
    // Load background
    const savedBg = localStorage.getItem('win11-bg');
    if (savedBg) {
        state.currentBackground = parseInt(savedBg);
        document.body.style.backgroundImage = `url('assets/background/bg${savedBg}.png')`;
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('win11-theme');
    if (savedTheme) {
        state.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Load volume
    const savedVolume = localStorage.getItem('win11-volume');
    if (savedVolume && elements.audio) {
        state.volume = parseInt(savedVolume);
        elements.audio.volume = state.volume / 100;
    }
}

// Refresh/Restart
function refreshDesktop() {
    location.reload();
}

// Search Function
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, '_blank');
            event.target.value = '';
            closeStartMenu();
        }
    }
}

// Quick action toggles
function toggleWifi() {
    const btn = document.querySelector('[data-action="wifi"]');
    if (btn) btn.classList.toggle('active');
    showNotification('Wi-Fi', btn?.classList.contains('active') ? 'Wi-Fi enabled' : 'Wi-Fi disabled', 'info');
}

function toggleBluetooth() {
    const btn = document.querySelector('[data-action="bluetooth"]');
    if (btn) btn.classList.toggle('active');
    showNotification('Bluetooth', btn?.classList.contains('active') ? 'Bluetooth enabled' : 'Bluetooth disabled', 'info');
}

function toggleAirplaneMode() {
    const btn = document.querySelector('[data-action="airplane"]');
    if (btn) btn.classList.toggle('active');
    showNotification('Airplane Mode', btn?.classList.contains('active') ? 'Airplane mode on' : 'Airplane mode off', 'info');
}

function toggleNightLight() {
    const btn = document.querySelector('[data-action="nightlight"]');
    if (btn) btn.classList.toggle('active');
    
    if (btn?.classList.contains('active')) {
        document.body.style.filter = 'sepia(30%) brightness(90%)';
    } else {
        document.body.style.filter = 'none';
    }
    
    showNotification('Night Light', btn?.classList.contains('active') ? 'Night light on' : 'Night light off', 'info');
}

// Expose functions to global scope for onclick handlers
window.toggleStartMenu = toggleStartMenu;
window.toggleQuickActions = toggleQuickActions;
window.changeBackground = changeBackground;
window.setBackground = setBackground;
window.toggleTheme = toggleTheme;
window.openAppStore = openAppStore;
window.openAnnouncement = openAnnouncement;
window.openArduino = openArduino;
window.openArduinoFolder = openArduinoFolder;
window.openGoogle = openGoogle;
window.openPoe = openPoe;
window.openUnderia = openUnderia;
window.playSound = playSound;
window.setVolume = setVolume;
window.refreshDesktop = refreshDesktop;
window.handleSearch = handleSearch;
window.toggleWifi = toggleWifi;
window.toggleBluetooth = toggleBluetooth;
window.toggleAirplaneMode = toggleAirplaneMode;
window.toggleNightLight = toggleNightLight;

// Legacy support
window.openNewWindow1 = openAppStore;
window.openNewWindow2 = openAnnouncement;
window.openNewWindow3 = openArduino;
window.openNewWindow4 = openArduinoFolder;
window.openNewWindow5 = openGoogle;
window.openNewWindow6 = openPoe;
window.openNewWindow7 = openUnderia;

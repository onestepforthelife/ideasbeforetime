// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ghar-ghar-sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// Install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
});

function showInstallButton() {
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response: ${outcome}`);
                deferredPrompt = null;
                installBtn.style.display = 'none';
            }
        });
    }
}

// Save/Load game state
function saveGameState() {
    const gameState = {
        players: players,
        currentTalking: currentTalking,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    localStorage.setItem('gharGharGameState', JSON.stringify(gameState));
    showNotification(t('gameSaved', currentLang));
}

function loadGameState() {
    const saved = localStorage.getItem('gharGharGameState');
    if (saved) {
        try {
            const gameState = JSON.parse(saved);
            players = gameState.players;
            currentTalking = gameState.currentTalking;
            renderCharacters();
            showNotification(t('gameLoaded', currentLang));
            return true;
        } catch (e) {
            console.error('Failed to load game:', e);
            return false;
        }
    }
    return false;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00b894;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Achievements system
const achievements = {
    firstGame: { name: 'First Game', icon: '🎮', unlocked: false },
    tenItems: { name: '10 Items Used', icon: '🎯', unlocked: false },
    allRoles: { name: 'All Roles Played', icon: '🌟', unlocked: false },
    storyteller: { name: 'Story Master', icon: '📖', unlocked: false }
};

function checkAchievements() {
    const stats = JSON.parse(localStorage.getItem('gharGharStats') || '{}');
    
    if (stats.gamesPlayed >= 1 && !achievements.firstGame.unlocked) {
        unlockAchievement('firstGame');
    }
    if (stats.itemsUsed >= 10 && !achievements.tenItems.unlocked) {
        unlockAchievement('tenItems');
    }
}

function unlockAchievement(key) {
    achievements[key].unlocked = true;
    showNotification(`🎉 Achievement Unlocked: ${achievements[key].icon} ${achievements[key].name}`);
    localStorage.setItem('gharGharAchievements', JSON.stringify(achievements));
}

// Track stats
function updateStats(action) {
    const stats = JSON.parse(localStorage.getItem('gharGharStats') || '{}');
    stats.gamesPlayed = (stats.gamesPlayed || 0) + (action === 'gameStart' ? 1 : 0);
    stats.itemsUsed = (stats.itemsUsed || 0) + (action === 'itemUsed' ? 1 : 0);
    localStorage.setItem('gharGharStats', JSON.stringify(stats));
    checkAchievements();
}

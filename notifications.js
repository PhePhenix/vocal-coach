class NotificationManager {
    constructor() {
        this.container = document.getElementById('notificationContainer');
        this.notifications = [];
        this.settings = storage.getSettings();
        this.permission = 'default';
        
        this.checkPermission();
    }
    
    checkPermission() {
        if ('Notification' in window) {
            this.permission = Notification.permission;
        }
    }
    
    requestPermission() {
        if ('Notification' in window && this.permission === 'default') {
            Notification.requestPermission().then(permission => {
                this.permission = permission;
                
                if (permission === 'granted') {
                    this.show({
                        type: 'success',
                        title: 'Notifications Activées',
                        message: 'Vous recevrez maintenant des notifications',
                        duration: 3000
                    });
                }
            });
        }
    }
    
    show(options) {
        const notification = {
            id: Date.now(),
            type: options.type || 'info',
            title: options.title || 'Notification',
            message: options.message || '',
            duration: options.duration || 4000,
            timestamp: new Date().toISOString()
        };
        
        this.notifications.push(notification);
        
        this.renderNotification(notification);
        
        if (this.settings.desktopNotifications && this.permission === 'granted') {
            this.showDesktopNotification(notification);
        }
        
        if (this.settings.soundNotifications) {
            this.playSound(notification.type);
        }
        
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, notification.duration);
    }
    
    renderNotification(notification) {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification ${notification.type}`;
        notificationElement.dataset.id = notification.id;
        
        const icon = this.getIcon(notification.type);
        
        notificationElement.innerHTML = `
            <div class="notification-icon">
                ${icon}
            </div>
            <div class="notification-content">
                <p class="notification-title">${notification.title}</p>
                <p class="notification-message">${notification.message}</p>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;
        
        const closeBtn = notificationElement.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification.id);
        });
        
        this.container.appendChild(notificationElement);
    }
    
    getIcon(type) {
        const icons = {
            success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>`,
            warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
            error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>`,
            info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>`
        };
        
        return icons[type] || icons.info;
    }
    
    showDesktopNotification(notification) {
        if (!('Notification' in window) || this.permission !== 'granted') {
            return;
        }
        
        const desktopNotification = new Notification(notification.title, {
            body: notification.message,
            icon: '/assets/icons/icon.svg',
            badge: '/assets/icons/icon.svg',
            tag: `vocal-coach-${notification.id}`,
            requireInteraction: false
        });
        
        desktopNotification.onclick = () => {
            window.focus();
            desktopNotification.close();
        };
        
        setTimeout(() => {
            desktopNotification.close();
        }, notification.duration);
    }
    
    playSound(type) {
        const sounds = {
            success: 'success',
            warning: 'warning',
            error: 'error',
            info: 'info'
        };
        
        const soundName = sounds[type] || 'info';
        const audio = new Audio(`/assets/sounds/${soundName}.mp3`);
        
        audio.volume = this.settings.volume / 100;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }
    
    removeNotification(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }
        
        const element = this.container.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }
    
    clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification.id);
        });
    }
    
    success(title, message, duration) {
        this.show({
            type: 'success',
            title,
            message,
            duration
        });
    }
    
    warning(title, message, duration) {
        this.show({
            type: 'warning',
            title,
            message,
            duration
        });
    }
    
    error(title, message, duration) {
        this.show({
            type: 'error',
            title,
            message,
            duration
        });
    }
    
    info(title, message, duration) {
        this.show({
            type: 'info',
            title,
            message,
            duration
        });
    }
    
    insultDetected(insult) {
        this.show({
            type: 'warning',
            title: 'Insulte Détectée',
            message: `L'insulte "${insult}" a été détectée. Reformule ta phrase.`,
            duration: 5000
        });
    }
    
    reformulationSuccess(original, reformulation) {
        this.show({
            type: 'success',
            title: 'Reformulation Réussie',
            message: `Excellent ! "${original}" → "${reformulation}"`,
            duration: 4000
        });
    }
    
    achievementUnlocked(badge) {
        this.show({
            type: 'success',
            title: 'Badge Débloqué !',
            message: `Tu as obtenu le badge "${badge.name}"`,
            duration: 6000
        });
    }
    
    challengeCompleted(challenge) {
        this.show({
            type: 'success',
            title: 'Défi Complété !',
            message: `Tu as complété le défi "${challenge.name}"`,
            duration: 5000
        });
    }
    
    levelUp(newLevel) {
        this.show({
            type: 'success',
            title: 'Niveau Supérieur !',
            message: `Tu es maintenant niveau ${newLevel}`,
            duration: 5000
        });
    }
    
    streakUpdated(streak) {
        this.show({
            type: 'info',
            title: 'Série Mise à Jour',
            message: `Tu tiens une série de ${streak} jours sans insulte`,
            duration: 4000
        });
    }
    
    dailyReminder() {
        this.show({
            type: 'info',
            title: 'Rappel Quotidien',
            message: 'N\'oublie pas de pratiquer ton langage aujourd\'hui',
            duration: 5000
        });
    }
    
    updateSettings(settings) {
        this.settings = settings;
    }
}

const notifications = new NotificationManager();

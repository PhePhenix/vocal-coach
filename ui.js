class UIManager {
    constructor() {
        this.currentView = 'dashboard';
        this.isListening = false;
        this.elements = {};
        this.initializeElements();
        this.bindEvents();
        this.updateDashboard();
    }
    
    initializeElements() {
        this.elements = {
            sidebar: document.getElementById('sidebar'),
            sidebarToggle: document.getElementById('sidebarToggle'),
            navItems: document.querySelectorAll('.nav-item'),
            views: document.querySelectorAll('.view'),
            pageTitle: document.getElementById('pageTitle'),
            themeToggle: document.getElementById('themeToggle'),
            notificationToggle: document.getElementById('notificationToggle'),
            notificationBadge: document.getElementById('notificationBadge'),
            micToggle: document.getElementById('micToggle'),
            mainContent: document.querySelector('.main-content'),
            
            politenessScore: document.getElementById('politenessScore'),
            insultsToday: document.getElementById('insultsToday'),
            totalInsults: document.getElementById('totalInsults'),
            streak: document.getElementById('streak'),
            currentLevel: document.getElementById('currentLevel'),
            currentXP: document.getElementById('currentXP'),
            nextLevelXP: document.getElementById('nextLevelXP'),
            xpFill: document.getElementById('xpFill'),
            userLevel: document.getElementById('userLevel'),
            
            transcriptionText: document.getElementById('transcriptionText'),
            warningDisplay: document.getElementById('warningDisplay'),
            warningMessage: document.getElementById('warningMessage'),
            suggestionsDisplay: document.getElementById('suggestionsDisplay'),
            suggestionsList: document.getElementById('suggestionsList'),
            messagesContainer: document.getElementById('messagesContainer'),
            coachingStatus: document.getElementById('coachingStatus'),
            
            modeButtons: document.querySelectorAll('.mode-btn'),
            periodButtons: document.querySelectorAll('.period-btn'),
            
            modalOverlay: document.getElementById('modalOverlay'),
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modalTitle'),
            modalBody: document.getElementById('modalBody'),
            modalClose: document.getElementById('modalClose'),
            modalFooter: document.getElementById('modalFooter'),
            
            recentReformulations: document.getElementById('recentReformulations'),
            dailyQuote: document.getElementById('dailyQuote'),
            dailyChallenge: document.getElementById('dailyChallenge'),
            challengeProgress: document.getElementById('challengeProgress'),
            challengeProgressText: document.getElementById('challengeProgressText'),
            acceptChallenge: document.getElementById('acceptChallenge'),
            
            badgesGrid: document.getElementById('badgesGrid'),
            activeChallenges: document.getElementById('activeChallenges'),
            availableChallenges: document.getElementById('availableChallenges'),
            
            historyTimeline: document.getElementById('historyTimeline'),
            historyFilterType: document.getElementById('historyFilterType'),
            historyFilterDate: document.getElementById('historyFilterDate'),
            exportHistory: document.getElementById('exportHistory'),
            exportHistoryPDF: document.getElementById('exportHistoryPDF')
        };
    }
    
    bindEvents() {
        this.elements.sidebarToggle.addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        this.elements.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
            });
        });
        
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        this.elements.notificationToggle.addEventListener('click', () => {
            notifications.requestPermission();
        });
        
        this.elements.micToggle.addEventListener('click', () => {
            this.toggleMicrophone();
        });
        
        this.elements.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode);
            });
        });
        
        this.elements.periodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const period = btn.dataset.period;
                this.setStatisticsPeriod(period);
            });
        });
        
        this.elements.modalClose.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.modalOverlay) {
                this.closeModal();
            }
        });
        
        this.elements.acceptChallenge.addEventListener('click', () => {
            this.acceptDailyChallenge();
        });
        
        this.elements.exportHistory.addEventListener('click', () => {
            storage.exportHistoryToCSV();
        });
        
        this.elements.exportHistoryPDF.addEventListener('click', () => {
            storage.exportHistoryToPDF();
        });
        
        if (this.elements.historyFilterType) {
            this.elements.historyFilterType.addEventListener('change', () => {
                this.filterHistory();
            });
        }
        
        if (this.elements.historyFilterDate) {
            this.elements.historyFilterDate.addEventListener('change', () => {
                this.filterHistory();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }
    
    toggleSidebar() {
        this.elements.sidebar.classList.toggle('collapsed');
        this.elements.mainContent.classList.toggle('expanded');
    }
    
    switchView(viewName) {
        this.currentView = viewName;
        
        this.elements.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === viewName) {
                item.classList.add('active');
            }
        });
        
        this.elements.views.forEach(view => {
            view.classList.remove('active');
            if (view.id === `${viewName}View`) {
                view.classList.add('active');
            }
        });
        
        const titles = {
            dashboard: 'Tableau de bord',
            coaching: 'Coaching',
            statistics: 'Statistiques',
            achievements: 'Badges',
            history: 'Historique',
            settings: 'Paramètres'
        };
        
        this.elements.pageTitle.textContent = titles[viewName] || 'Vocal Coach';
        
        if (viewName === 'dashboard') {
            this.updateDashboard();
        } else if (viewName === 'statistics') {
            this.updateStatistics();
        } else if (viewName === 'achievements') {
            this.updateAchievements();
        } else if (viewName === 'history') {
            this.updateHistory();
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const settings = storage.getSettings();
        settings.theme = newTheme;
        storage.saveSettings(settings);
    }
    
    toggleMicrophone() {
        if (this.isListening) {
            voiceManager.stopListening();
            this.isListening = false;
            this.elements.micToggle.classList.remove('active');
            this.updateCoachingStatus('inactive');
        } else {
            voiceManager.requestMicrophonePermission().then(granted => {
                if (granted) {
                    voiceManager.startListening();
                    this.isListening = true;
                    this.elements.micToggle.classList.add('active');
                    this.updateCoachingStatus('active');
                } else {
                    notifications.error('Microphone Non Autorisé', 'Veuillez autoriser l\'accès au microphone');
                }
            });
        }
    }
    
    updateCoachingStatus(status) {
        const statusDot = this.elements.coachingStatus?.querySelector('.status-dot');
        const statusText = this.elements.coachingStatus?.querySelector('.status-text');
        
        if (statusDot && statusText) {
            statusDot.className = 'status-dot';
            
            switch (status) {
                case 'active':
                    statusDot.classList.add('active');
                    statusText.textContent = 'Écoute en cours';
                    break;
                case 'warning':
                    statusDot.classList.add('warning');
                    statusText.textContent = 'Insulte détectée';
                    break;
                case 'inactive':
                default:
                    statusText.textContent = 'En attente';
                    break;
            }
        }
    }
    
    setMode(mode) {
        aiCoach.setMode(mode);
        
        this.elements.modeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            }
        });
        
        notifications.info('Mode Changé', `Mode ${mode} activé`);
    }
    
    setStatisticsPeriod(period) {
        this.elements.periodButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.period === period) {
                btn.classList.add('active');
            }
        });
        
        this.updateStatistics(period);
    }
    
    updateDashboard() {
        const stats = statisticsManager.getSummary();
        const progress = storage.getUserProgress();
        
        this.elements.politenessScore.textContent = stats.politenessScore;
        this.elements.insultsToday.textContent = stats.insultsToday;
        this.elements.totalInsults.textContent = stats.totalInsults;
        this.elements.streak.textContent = stats.currentStreak;
        
        this.elements.currentLevel.textContent = progress.level;
        this.elements.currentXP.textContent = progress.xp;
        this.elements.nextLevelXP.textContent = progress.xpToNextLevel;
        this.elements.xpFill.style.width = `${(progress.xp / progress.xpToNextLevel) * 100}%`;
        this.elements.userLevel.textContent = `Niveau ${progress.level}`;
        
        this.updateRecentReformulations();
        this.updateDailyQuote();
        this.updateDailyChallenge();
    }
    
    updateRecentReformulations() {
        const reformulations = storage.getReformulations().slice(0, 5);
        
        if (reformulations.length === 0) {
            this.elements.recentReformulations.innerHTML = '<p class="empty-state">Aucune reformulation récente</p>';
            return;
        }
        
        this.elements.recentReformulations.innerHTML = reformulations.map(ref => `
            <div class="reformulation-item">
                <span class="reformulation-original">${ref.original}</span>
                <span class="reformulation-new">→ ${ref.reformulation}</span>
            </div>
        `).join('');
    }
    
    updateDailyQuote() {
        const quotes = [
            { text: 'La maîtrise de soi commence par la maîtrise de ses mots.', author: 'Socrate' },
            { text: 'Les mots sont les seules choses qui durent éternellement.', author: 'Hérodote' },
            { text: 'Le langage est l\'image de l\'esprit.', author: 'Aristote' },
            { text: 'Bien parler est le premier art du bien vivre.', author: 'Proverbe' },
            { text: 'Les mots doux calment les esprits.', author: 'Proverbe' },
            { text: 'La parole est d\'argent, mais le silence est d\'or.', author: 'Proverbe' },
            { text: 'Le langage est la maison de l\'être.', author: 'Martin Heidegger' },
            { text: 'Les mots peuvent changer le monde.', author: 'Proverbe' },
            { text: 'Parler est un besoin, écouter est un art.', author: 'Johann Wolfgang von Goethe' },
            { text: 'Le langage est la clef du cœur.', author: 'Proverbe' }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.elements.dailyQuote.textContent = `"${randomQuote.text}"`;
        this.elements.dailyQuote.nextElementSibling.textContent = `- ${randomQuote.author}`;
    }
    
    updateDailyChallenge() {
        const challenge = achievementsManager.generateDailyChallenge();
        this.elements.dailyChallenge.textContent = challenge.description;
        this.elements.challengeProgress.style.width = '0%';
        this.elements.challengeProgressText.textContent = '0%';
    }
    
    acceptDailyChallenge() {
        const challenge = achievementsManager.generateDailyChallenge();
        achievementsManager.startChallenge(challenge.id);
        
        this.elements.acceptChallenge.textContent = 'Défi Accepté';
        this.elements.acceptChallenge.disabled = true;
        
        notifications.success('Défi Accepté', 'Tu as accepté le défi quotidien');
    }
    
    updateStatistics(period = 'day') {
        const summary = statisticsManager.getSummary();
        const comparison = statisticsManager.getComparison(period);
        
        document.getElementById('statsInsults').textContent = summary.insultsToday;
        document.getElementById('statsReformulations').textContent = summary.totalReformulations;
        document.getElementById('statsTime').textContent = this.formatTime(summary.timeWithoutInsult);
        document.getElementById('statsRecord').textContent = this.formatTime(summary.recordTimeWithoutInsult);
        
        const insultsChange = document.getElementById('statsInsultsChange');
        insultsChange.textContent = comparison.insultsChange > 0 ? `+${comparison.insultsChange}` : comparison.insultsChange;
        insultsChange.className = `overview-change ${comparison.insultsChange <= 0 ? 'positive' : 'negative'}`;
        
        const reformulationsChange = document.getElementById('statsReformulationsChange');
        reformulationsChange.textContent = comparison.reformulationsChange > 0 ? `+${comparison.reformulationsChange}` : comparison.reformulationsChange;
        reformulationsChange.className = `overview-change ${comparison.reformulationsChange >= 0 ? 'positive' : 'negative'}`;
        
        this.updateInsultsTable();
    }
    
    updateInsultsTable() {
        const insults = storage.getInsults().slice(0, 20);
        const tbody = document.getElementById('insultsTableBody');
        
        if (insults.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Aucune insulte enregistrée</td></tr>';
            return;
        }
        
        tbody.innerHTML = insults.map(insult => `
            <tr>
                <td>${new Date(insult.timestamp).toLocaleString('fr-FR')}</td>
                <td>${insult.insult}</td>
                <td>${insult.context}</td>
                <td>-</td>
                <td><span class="status-badge warning">Détecté</span></td>
            </tr>
        `).join('');
    }
    
    updateAchievements() {
        const badges = achievementsManager.getBadges();
        const activeChallenges = achievementsManager.getActiveChallenges();
        const availableChallenges = achievementsManager.getAvailableChallenges();
        
        this.elements.badgesGrid.innerHTML = badges.map(badge => `
            <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
            </div>
        `).join('');
        
        document.getElementById('badgesEarned').textContent = badges.filter(b => b.unlocked).length;
        document.getElementById('totalBadges').textContent = badges.length;
        
        this.elements.activeChallenges.innerHTML = activeChallenges.length === 0 
            ? '<p class="empty-state">Aucun défi en cours</p>'
            : activeChallenges.map(challenge => `
                <div class="challenge-item active">
                    <div class="challenge-icon">🎯</div>
                    <div class="challenge-info">
                        <div class="challenge-title">${challenge.name}</div>
                        <div class="challenge-description">${challenge.description}</div>
                    </div>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                        </div>
                        <span class="progress-text">${Math.round(challenge.progress)}%</span>
                    </div>
                </div>
            `).join('');
        
        this.elements.availableChallenges.innerHTML = availableChallenges.map(challenge => `
            <div class="challenge-item">
                <div class="challenge-icon">🎯</div>
                <div class="challenge-info">
                    <div class="challenge-title">${challenge.name}</div>
                    <div class="challenge-description">${challenge.description}</div>
                </div>
                <button class="btn btn-secondary" onclick="achievementsManager.startChallenge('${challenge.id}')">Commencer</button>
            </div>
        `).join('');
    }
    
    updateHistory() {
        const history = storage.getHistory().slice(0, 50);
        
        if (history.length === 0) {
            this.elements.historyTimeline.innerHTML = '<p class="empty-state">Aucun historique disponible</p>';
            return;
        }
        
        this.elements.historyTimeline.innerHTML = history.map(item => `
            <div class="timeline-item ${item.type}">
                <div class="timeline-icon">
                    ${this.getTimelineIcon(item.type)}
                </div>
                <div class="timeline-content">
                    <div class="timeline-date">${new Date(item.timestamp).toLocaleString('fr-FR')}</div>
                    <div class="timeline-text">${item.content}</div>
                </div>
            </div>
        `).join('');
    }
    
    filterHistory() {
        const type = this.elements.historyFilterType.value;
        const date = this.elements.historyFilterDate.value;
        
        let history = storage.getHistory();
        
        if (type !== 'all') {
            history = history.filter(item => item.type === type);
        }
        
        if (date) {
            history = history.filter(item => {
                const itemDate = new Date(item.timestamp).toDateString();
                return itemDate === new Date(date).toDateString();
            });
        }
        
        this.elements.historyTimeline.innerHTML = history.slice(0, 50).map(item => `
            <div class="timeline-item ${item.type}">
                <div class="timeline-icon">
                    ${this.getTimelineIcon(item.type)}
                </div>
                <div class="timeline-content">
                    <div class="timeline-date">${new Date(item.timestamp).toLocaleString('fr-FR')}</div>
                    <div class="timeline-text">${item.content}</div>
                </div>
            </div>
        `).join('');
    }
    
    getTimelineIcon(type) {
        const icons = {
            insult: '⚠️',
            reformulation: '✅',
            achievement: '🏆',
            challenge: '🎯'
        };
        return icons[type] || '📝';
    }
    
    updateTranscription(transcript) {
        this.elements.transcriptionText.textContent = transcript || '...';
    }
    
    showWarning(message) {
        this.elements.warningMessage.textContent = message;
        this.elements.warningDisplay.style.display = 'flex';
        this.updateCoachingStatus('warning');
    }
    
    hideWarning() {
        this.elements.warningDisplay.style.display = 'none';
        this.updateCoachingStatus('active');
    }
    
    showSuggestions(suggestions) {
        this.elements.suggestionsList.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item">${suggestion}</div>
        `).join('');
        
        this.elements.suggestionsDisplay.style.display = 'flex';
    }
    
    hideSuggestions() {
        this.elements.suggestionsDisplay.style.display = 'none';
    }
    
    addMessage(text, type = 'ai') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${type === 'ai' ? this.getAIAvatar() : this.getUserAvatar()}
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        
        this.elements.messagesContainer.appendChild(messageDiv);
        this.elements.messagesContainer.scrollTop = this.elements.messagesContainer.scrollHeight;
    }
    
    getAIAvatar() {
        return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="16" cy="16" r="14"/>
            <path d="M10 16C10 16 12 20 16 20C20 20 22 16 22 16" stroke-linecap="round"/>
            <circle cx="11" cy="11" r="2" fill="currentColor"/>
            <circle cx="21" cy="11" r="2" fill="currentColor"/>
        </svg>`;
    }
    
    getUserAvatar() {
        return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>`;
    }
    
    showModal(title, content, footer = '') {
        this.elements.modalTitle.textContent = title;
        this.elements.modalBody.innerHTML = content;
        this.elements.modalFooter.innerHTML = footer;
        this.elements.modalOverlay.classList.add('active');
    }
    
    closeModal() {
        this.elements.modalOverlay.classList.remove('active');
    }
    
    handleKeyboard(e) {
        const settings = storage.getSettings();
        
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            this.toggleMicrophone();
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'm') {
            e.preventDefault();
            const modes = ['normal', 'strict', 'training', 'child', 'adult'];
            const currentMode = aiCoach.getMode();
            const currentIndex = modes.indexOf(currentMode);
            const nextIndex = (currentIndex + 1) % modes.length;
            this.setMode(modes[nextIndex]);
        }
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }
    
    updateNotificationBadge(count) {
        this.elements.notificationBadge.textContent = count;
        this.elements.notificationBadge.style.display = count > 0 ? 'block' : 'none';
    }
}

const uiManager = new UIManager();

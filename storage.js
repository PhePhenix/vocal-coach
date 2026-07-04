class StorageManager {
    constructor() {
        this.STORAGE_KEYS = {
            SETTINGS: 'vocal_coach_settings',
            STATISTICS: 'vocal_coach_statistics',
            ACHIEVEMENTS: 'vocal_coach_achievements',
            HISTORY: 'vocal_coach_history',
            INSULTS: 'vocal_coach_insults',
            REFORMULATIONS: 'vocal_coach_reformulations',
            USER_PROGRESS: 'vocal_coach_user_progress',
            CHALLENGES: 'vocal_coach_challenges',
            CUSTOM_WORDS: 'vocal_coach_custom_words',
            SESSION: 'vocal_coach_session'
        };
        
        this.defaultSettings = {
            voice: 'default',
            volume: 80,
            rate: 1,
            pitch: 1,
            language: 'fr',
            sensitivity: 5,
            severity: 'high',
            theme: 'dark',
            animations: true,
            sounds: true,
            desktopNotifications: true,
            soundNotifications: true,
            dailyReminder: true,
            micShortcut: 'Ctrl+M',
            modeShortcut: 'Ctrl+Shift+M'
        };
        
        this.defaultStatistics = {
            totalInsults: 0,
            insultsToday: 0,
            insultsThisWeek: 0,
            insultsThisMonth: 0,
            totalReformulations: 0,
            reformulationsToday: 0,
            politenessScore: 100,
            currentStreak: 0,
            longestStreak: 0,
            timeWithoutInsult: 0,
            recordTimeWithoutInsult: 0,
            lastInsultDate: null,
            dailyData: {},
            weeklyData: {},
            monthlyData: {},
            hourlyData: {}
        };
        
        this.defaultUserProgress = {
            level: 1,
            xp: 0,
            totalXP: 0,
            xpToNextLevel: 100,
            badges: [],
            completedChallenges: []
        };
        
        this.initializeStorage();
    }
    
    initializeStorage() {
        Object.values(this.STORAGE_KEYS).forEach(key => {
            if (!localStorage.getItem(key)) {
                this.setDefaultValue(key);
            }
        });
    }
    
    setDefaultValue(key) {
        switch (key) {
            case this.STORAGE_KEYS.SETTINGS:
                this.setItem(key, this.defaultSettings);
                break;
            case this.STORAGE_KEYS.STATISTICS:
                this.setItem(key, this.defaultStatistics);
                break;
            case this.STORAGE_KEYS.ACHIEVEMENTS:
                this.setItem(key, []);
                break;
            case this.STORAGE_KEYS.HISTORY:
                this.setItem(key, []);
                break;
            case this.STORAGE_KEYS.INSULTS:
                this.setItem(key, []);
                break;
            case this.STORAGE_KEYS.REFORMULATIONS:
                this.setItem(key, []);
                break;
            case this.STORAGE_KEYS.USER_PROGRESS:
                this.setItem(key, this.defaultUserProgress);
                break;
            case this.STORAGE_KEYS.CHALLENGES:
                this.setItem(key, []);
                break;
            case this.STORAGE_KEYS.CUSTOM_WORDS:
                this.setItem(key, { forbidden: [], allowed: [] });
                break;
            case this.STORAGE_KEYS.SESSION:
                this.setItem(key, {
                    currentMode: 'normal',
                    consecutiveInsults: 0,
                    lastInsult: null,
                    sessionStart: new Date().toISOString()
                });
                break;
        }
    }
    
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }
    
    removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
    
    clearAll() {
        try {
            Object.values(this.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            this.initializeStorage();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
    
    getSettings() {
        return this.getItem(this.STORAGE_KEYS.SETTINGS) || this.defaultSettings;
    }
    
    saveSettings(settings) {
        return this.setItem(this.STORAGE_KEYS.SETTINGS, settings);
    }
    
    getStatistics() {
        return this.getItem(this.STORAGE_KEYS.STATISTICS) || this.defaultStatistics;
    }
    
    saveStatistics(statistics) {
        return this.setItem(this.STORAGE_KEYS.STATISTICS, statistics);
    }
    
    updateStatistics(updates) {
        const stats = this.getStatistics();
        Object.assign(stats, updates);
        return this.saveStatistics(stats);
    }
    
    getAchievements() {
        return this.getItem(this.STORAGE_KEYS.ACHIEVEMENTS) || [];
    }
    
    saveAchievements(achievements) {
        return this.setItem(this.STORAGE_KEYS.ACHIEVEMENTS, achievements);
    }
    
    addAchievement(achievement) {
        const achievements = this.getAchievements();
        if (!achievements.find(a => a.id === achievement.id)) {
            achievements.push({
                ...achievement,
                unlockedAt: new Date().toISOString()
            });
            return this.saveAchievements(achievements);
        }
        return false;
    }
    
    getHistory() {
        return this.getItem(this.STORAGE_KEYS.HISTORY) || [];
    }
    
    saveHistory(history) {
        return this.setItem(this.STORAGE_KEYS.HISTORY, history);
    }
    
    addHistoryItem(item) {
        const history = this.getHistory();
        history.unshift({
            ...item,
            timestamp: new Date().toISOString()
        });
        if (history.length > 1000) {
            history.pop();
        }
        return this.saveHistory(history);
    }
    
    getInsults() {
        return this.getItem(this.STORAGE_KEYS.INSULTS) || [];
    }
    
    saveInsults(insults) {
        return this.setItem(this.STORAGE_KEYS.INSULTS, insults);
    }
    
    addInsult(insult) {
        const insults = this.getInsults();
        insults.unshift({
            ...insult,
            timestamp: new Date().toISOString()
        });
        if (insults.length > 500) {
            insults.pop();
        }
        return this.saveInsults(insults);
    }
    
    getReformulations() {
        return this.getItem(this.STORAGE_KEYS.REFORMULATIONS) || [];
    }
    
    saveReformulations(reformulations) {
        return this.setItem(this.STORAGE_KEYS.REFORMULATIONS, reformulations);
    }
    
    addReformulation(reformulation) {
        const reformulations = this.getReformulations();
        reformulations.unshift({
            ...reformulation,
            timestamp: new Date().toISOString()
        });
        if (reformulations.length > 500) {
            reformulations.pop();
        }
        return this.saveReformulations(reformulations);
    }
    
    getUserProgress() {
        return this.getItem(this.STORAGE_KEYS.USER_PROGRESS) || this.defaultUserProgress;
    }
    
    saveUserProgress(progress) {
        return this.setItem(this.STORAGE_KEYS.USER_PROGRESS, progress);
    }
    
    addXP(amount) {
        const progress = this.getUserProgress();
        progress.xp += amount;
        progress.totalXP += amount;
        
        while (progress.xp >= progress.xpToNextLevel) {
            progress.xp -= progress.xpToNextLevel;
            progress.level++;
            progress.xpToNextLevel = Math.floor(progress.xpToNextLevel * 1.5);
        }
        
        this.saveUserProgress(progress);
        return progress;
    }
    
    getChallenges() {
        return this.getItem(this.STORAGE_KEYS.CHALLENGES) || [];
    }
    
    saveChallenges(challenges) {
        return this.setItem(this.STORAGE_KEYS.CHALLENGES, challenges);
    }
    
    getCustomWords() {
        return this.getItem(this.STORAGE_KEYS.CUSTOM_WORDS) || { forbidden: [], allowed: [] };
    }
    
    saveCustomWords(customWords) {
        return this.setItem(this.STORAGE_KEYS.CUSTOM_WORDS, customWords);
    }
    
    getSession() {
        return this.getItem(this.STORAGE_KEYS.SESSION);
    }
    
    saveSession(session) {
        return this.setItem(this.STORAGE_KEYS.SESSION, session);
    }
    
    updateSession(updates) {
        const session = this.getSession() || {};
        Object.assign(session, updates);
        return this.saveSession(session);
    }
    
    resetDailyData() {
        const stats = this.getStatistics();
        stats.insultsToday = 0;
        stats.reformulationsToday = 0;
        this.saveStatistics(stats);
    }
    
    resetWeeklyData() {
        const stats = this.getStatistics();
        stats.insultsThisWeek = 0;
        this.saveStatistics(stats);
    }
    
    resetMonthlyData() {
        const stats = this.getStatistics();
        stats.insultsThisMonth = 0;
        this.saveStatistics(stats);
    }
    
    exportData() {
        const data = {
            settings: this.getSettings(),
            statistics: this.getStatistics(),
            achievements: this.getAchievements(),
            history: this.getHistory(),
            insults: this.getInsults(),
            reformulations: this.getReformulations(),
            userProgress: this.getUserProgress(),
            challenges: this.getChallenges(),
            customWords: this.getCustomWords(),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
    
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.settings) this.saveSettings(data.settings);
            if (data.statistics) this.saveStatistics(data.statistics);
            if (data.achievements) this.saveAchievements(data.achievements);
            if (data.history) this.saveHistory(data.history);
            if (data.insults) this.saveInsults(data.insults);
            if (data.reformulations) this.saveReformulations(data.reformulations);
            if (data.userProgress) this.saveUserProgress(data.userProgress);
            if (data.challenges) this.saveChallenges(data.challenges);
            if (data.customWords) this.saveCustomWords(data.customWords);
            
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
    
    exportToCSV(data, filename) {
        if (!data || data.length === 0) return false;
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => {
                const value = row[header];
                const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
                return `"${stringValue.replace(/"/g, '""')}"`;
            }).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        
        return true;
    }
    
    exportHistoryToCSV() {
        const history = this.getHistory();
        return this.exportToCSV(history, 'vocal-coach-history.csv');
    }
    
    exportInsultsToCSV() {
        const insults = this.getInsults();
        return this.exportToCSV(insults, 'vocal-coach-insults.csv');
    }
    
    exportReformulationsToCSV() {
        const reformulations = this.getReformulations();
        return this.exportToCSV(reformulations, 'vocal-coach-reformulations.csv');
    }
    
    exportToPDF(content, filename) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${filename}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
    
    exportHistoryToPDF() {
        const history = this.getHistory();
        let content = '<h1>Historique Vocal Coach</h1>';
        
        if (history.length === 0) {
            content += '<p>Aucun historique disponible.</p>';
        } else {
            content += '<table><thead><tr><th>Date</th><th>Type</th><th>Contenu</th></tr></thead><tbody>';
            history.forEach(item => {
                content += `<tr>
                    <td>${new Date(item.timestamp).toLocaleString()}</td>
                    <td>${item.type}</td>
                    <td>${item.content || item.message || ''}</td>
                </tr>`;
            });
            content += '</tbody></table>';
        }
        
        this.exportToPDF(content, 'vocal-coach-history.pdf');
    }
    
    getStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length;
            }
        }
        return (total / 1024).toFixed(2) + ' KB';
    }
}

const storage = new StorageManager();

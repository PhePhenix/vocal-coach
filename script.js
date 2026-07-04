class VocalCoachApp {
    constructor() {
        this.isInitialized = false;
        this.updateInterval = null;
        this.challengeCheckInterval = null;
    }
    
    async initialize() {
        if (this.isInitialized) return;
        
        try {
            await this.checkBrowserSupport();
            this.setupVoiceRecognition();
            this.setupPeriodicUpdates();
            this.setupDailyReset();
            this.setupChallengeChecks();
            this.loadSettings();
            this.checkAchievements();
            this.displayGreeting();
            
            this.isInitialized = true;
            console.log('Vocal Coach initialized successfully');
        } catch (error) {
            console.error('Error initializing Vocal Coach:', error);
            notifications.error('Erreur d\'Initialisation', 'Impossible d\'initialiser l\'application');
        }
    }
    
    async checkBrowserSupport() {
        const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        const hasSpeechSynthesis = 'speechSynthesis' in window;
        const hasLocalStorage = 'localStorage' in window;
        
        if (!hasSpeechRecognition) {
            notifications.error('Navigateur Non Supporté', 'La reconnaissance vocale n\'est pas supportée par ce navigateur');
        }
        
        if (!hasSpeechSynthesis) {
            notifications.error('Navigateur Non Supporté', 'La synthèse vocale n\'est pas supportée par ce navigateur');
        }
        
        if (!hasLocalStorage) {
            notifications.error('Navigateur Non Supporté', 'Le stockage local n\'est pas supporté par ce navigateur');
        }
        
        return hasSpeechRecognition && hasSpeechSynthesis && hasLocalStorage;
    }
    
    setupVoiceRecognition() {
        voiceManager.setOnResult((result) => {
            this.handleVoiceResult(result);
        });
        
        voiceManager.setOnError((error) => {
            this.handleVoiceError(error);
        });
        
        voiceManager.setOnStart(() => {
            console.log('Voice recognition started');
        });
        
        voiceManager.setOnEnd(() => {
            console.log('Voice recognition ended');
        });
    }
    
    handleVoiceResult(result) {
        const transcript = result.transcript;
        uiManager.updateTranscription(transcript);
        
        if (result.final) {
            this.processTranscript(transcript);
        }
    }
    
    handleVoiceError(error) {
        console.error('Voice recognition error:', error);
        
        switch (error) {
            case 'permission':
                notifications.error('Permission Refusée', 'Veuillez autoriser l\'accès au microphone');
                break;
            case 'network':
                notifications.warning('Problème Réseau', 'Vérifiez votre connexion internet');
                break;
            default:
                notifications.warning('Erreur de Reconnaissance', `Erreur: ${error}`);
        }
    }
    
    processTranscript(transcript) {
        const result = aiCoach.processTranscript(transcript);
        
        if (result.type === 'insult') {
            this.handleInsultDetection(result);
        } else if (result.type === 'normal' && result.response) {
            this.handleNormalSpeech(result);
        }
    }
    
    handleInsultDetection(result) {
        uiManager.showWarning(result.response);
        uiManager.showSuggestions(result.suggestions);
        
        voiceManager.speak(result.response);
        uiManager.addMessage(result.response, 'ai');
        
        notifications.insultDetected(result.insult);
        
        statisticsManager.recordHourlyData();
        statisticsManager.calculatePolitenessScore();
        statisticsManager.updateStreak();
        statisticsManager.recordDailyData();
        
        achievementsManager.checkBadges();
        achievementsManager.checkChallenges();
        
        uiManager.updateDashboard();
    }
    
    handleNormalSpeech(result) {
        if (result.response) {
            voiceManager.speak(result.response);
            uiManager.addMessage(result.response, 'ai');
        }
    }
    
    handleReformulation(original, reformulation) {
        const result = aiCoach.handleReformulation(original, reformulation);
        
        if (result.type === 'success') {
            uiManager.hideWarning();
            uiManager.hideSuggestions();
            
            voiceManager.speak(result.response);
            uiManager.addMessage(result.response, 'ai');
            
            notifications.reformulationSuccess(original, reformulation);
            
            statisticsManager.calculatePolitenessScore();
            statisticsManager.recordDailyData();
            
            achievementsManager.checkBadges();
            achievementsManager.checkChallenges();
            
            uiManager.updateDashboard();
        } else {
            uiManager.showWarning(result.response);
            uiManager.showSuggestions(result.suggestions);
            
            voiceManager.speak(result.response);
            uiManager.addMessage(result.response, 'ai');
        }
    }
    
    setupPeriodicUpdates() {
        this.updateInterval = setInterval(() => {
            statisticsManager.calculateTimeWithoutInsult();
            statisticsManager.calculatePolitenessScore();
            
            if (uiManager.currentView === 'dashboard') {
                uiManager.updateDashboard();
            }
        }, 60000);
    }
    
    setupDailyReset() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            this.performDailyReset();
            setInterval(() => this.performDailyReset(), 86400000);
        }, msUntilMidnight);
    }
    
    performDailyReset() {
        statisticsManager.resetDaily();
        statisticsManager.updateStreak();
        statisticsManager.recordDailyData();
        
        achievementsManager.checkBadges();
        
        notifications.info('Nouvelle Journée', 'Les statistiques quotidiennes ont été réinitialisées');
        
        uiManager.updateDashboard();
    }
    
    setupChallengeChecks() {
        this.challengeCheckInterval = setInterval(() => {
            achievementsManager.checkChallenges();
        }, 30000);
    }
    
    loadSettings() {
        const settings = storage.getSettings();
        
        insultDetector.setLanguage(settings.language);
        insultDetector.setSensitivity(settings.sensitivity);
        insultDetector.setSeverity(settings.severity);
        
        voiceManager.loadSettings(settings);
        notifications.updateSettings(settings);
        
        const customWords = storage.getCustomWords();
        insultDetector.customWords = customWords;
    }
    
    checkAchievements() {
        achievementsManager.checkBadges();
    }
    
    displayGreeting() {
        const greeting = aiCoach.getGreeting();
        uiManager.addMessage(greeting, 'ai');
    }
    
    start() {
        this.initialize();
    }
    
    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.challengeCheckInterval) {
            clearInterval(this.challengeCheckInterval);
        }
        
        voiceManager.stopListening();
        voiceManager.stopSpeaking();
    }
    
    exportAllData() {
        const data = {
            settings: storage.getSettings(),
            statistics: statisticsManager.exportStatistics(),
            achievements: achievementsManager.getBadges(),
            challenges: achievementsManager.getChallenges(),
            history: storage.getHistory(),
            insults: storage.getInsults(),
            reformulations: storage.getReformulations(),
            userProgress: storage.getUserProgress(),
            customWords: storage.getCustomWords(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `vocal-coach-complete-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        notifications.success('Export Complet', 'Toutes vos données ont été exportées');
    }
    
    importAllData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.settings) storage.saveSettings(data.settings);
            if (data.statistics) storage.saveStatistics(data.statistics);
            if (data.achievements) storage.saveAchievements(data.achievements);
            if (data.history) storage.saveHistory(data.history);
            if (data.insults) storage.saveInsults(data.insults);
            if (data.reformulations) storage.saveReformulations(data.reformulations);
            if (data.userProgress) storage.saveUserProgress(data.userProgress);
            if (data.customWords) storage.saveCustomWords(data.customWords);
            
            this.loadSettings();
            uiManager.updateDashboard();
            
            notifications.success('Import Complet', 'Toutes vos données ont été importées');
            
            setTimeout(() => {
                location.reload();
            }, 2000);
            
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            notifications.error('Import Échoué', 'Impossible d\'importer les données');
            return false;
        }
    }
}

const app = new VocalCoachApp();

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});

window.addEventListener('beforeunload', () => {
    app.stop();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

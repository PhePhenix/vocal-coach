class SettingsManager {
    constructor() {
        this.settings = storage.getSettings();
        this.elements = {};
        this.initializeElements();
        this.loadSettings();
        this.bindEvents();
    }
    
    initializeElements() {
        this.elements = {
            voiceSelect: document.getElementById('voiceSelect'),
            volumeSlider: document.getElementById('volumeSlider'),
            volumeValue: document.getElementById('volumeValue'),
            rateSlider: document.getElementById('rateSlider'),
            rateValue: document.getElementById('rateValue'),
            pitchSlider: document.getElementById('pitchSlider'),
            pitchValue: document.getElementById('pitchValue'),
            languageSelect: document.getElementById('languageSelect'),
            sensitivitySlider: document.getElementById('sensitivitySlider'),
            sensitivityValue: document.getElementById('sensitivityValue'),
            severitySelect: document.getElementById('severitySelect'),
            customWords: document.getElementById('customWords'),
            allowedWords: document.getElementById('allowedWords'),
            themeSelect: document.getElementById('themeSelect'),
            animationsToggle: document.getElementById('animationsToggle'),
            soundsToggle: document.getElementById('soundsToggle'),
            desktopNotifications: document.getElementById('desktopNotifications'),
            soundNotifications: document.getElementById('soundNotifications'),
            dailyReminder: document.getElementById('dailyReminder'),
            micShortcut: document.getElementById('micShortcut'),
            modeShortcut: document.getElementById('modeShortcut'),
            saveSettings: document.getElementById('saveSettings'),
            resetSettings: document.getElementById('resetSettings'),
            exportData: document.getElementById('exportData'),
            importData: document.getElementById('importData'),
            resetData: document.getElementById('resetData')
        };
    }
    
    loadSettings() {
        if (!this.elements.voiceSelect) return;
        
        this.populateVoices();
        
        this.elements.voiceSelect.value = this.settings.voice;
        this.elements.volumeSlider.value = this.settings.volume;
        this.elements.volumeValue.textContent = this.settings.volume + '%';
        this.elements.rateSlider.value = this.settings.rate;
        this.elements.rateValue.textContent = this.settings.rate + 'x';
        this.elements.pitchSlider.value = this.settings.pitch;
        this.elements.pitchValue.textContent = this.settings.pitch;
        this.elements.languageSelect.value = this.settings.language;
        this.elements.sensitivitySlider.value = this.settings.sensitivity;
        this.elements.sensitivityValue.textContent = this.settings.sensitivity;
        this.elements.severitySelect.value = this.settings.severity;
        this.elements.themeSelect.value = this.settings.theme;
        this.elements.animationsToggle.checked = this.settings.animations;
        this.elements.soundsToggle.checked = this.settings.sounds;
        this.elements.desktopNotifications.checked = this.settings.desktopNotifications;
        this.elements.soundNotifications.checked = this.settings.soundNotifications;
        this.elements.dailyReminder.checked = this.settings.dailyReminder;
        this.elements.micShortcut.value = this.settings.micShortcut;
        this.elements.modeShortcut.value = this.settings.modeShortcut;
        
        const customWords = storage.getCustomWords();
        this.elements.customWords.value = customWords.forbidden.join('\n');
        this.elements.allowedWords.value = customWords.allowed.join('\n');
        
        this.applyTheme();
    }
    
    populateVoices() {
        const voices = voiceManager.getVoices();
        this.elements.voiceSelect.innerHTML = '<option value="default">Voix par défaut</option>';
        
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            this.elements.voiceSelect.appendChild(option);
        });
    }
    
    bindEvents() {
        if (!this.elements.voiceSelect) return;
        
        this.elements.volumeSlider.addEventListener('input', (e) => {
            this.elements.volumeValue.textContent = e.target.value + '%';
        });
        
        this.elements.rateSlider.addEventListener('input', (e) => {
            this.elements.rateValue.textContent = e.target.value + 'x';
        });
        
        this.elements.pitchSlider.addEventListener('input', (e) => {
            this.elements.pitchValue.textContent = e.target.value;
        });
        
        this.elements.sensitivitySlider.addEventListener('input', (e) => {
            this.elements.sensitivityValue.textContent = e.target.value;
        });
        
        this.elements.themeSelect.addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
            this.applyTheme();
        });
        
        this.elements.animationsToggle.addEventListener('change', (e) => {
            this.settings.animations = e.target.checked;
            this.applyAnimations();
        });
        
        this.elements.saveSettings.addEventListener('click', () => {
            this.saveSettings();
        });
        
        this.elements.resetSettings.addEventListener('click', () => {
            this.resetSettings();
        });
        
        this.elements.exportData.addEventListener('click', () => {
            this.exportData();
        });
        
        this.elements.importData.addEventListener('click', () => {
            this.importData();
        });
        
        this.elements.resetData.addEventListener('click', () => {
            this.resetData();
        });
    }
    
    saveSettings() {
        this.settings.voice = this.elements.voiceSelect.value;
        this.settings.volume = parseInt(this.elements.volumeSlider.value);
        this.settings.rate = parseFloat(this.elements.rateSlider.value);
        this.settings.pitch = parseFloat(this.elements.pitchSlider.value);
        this.settings.language = this.elements.languageSelect.value;
        this.settings.sensitivity = parseInt(this.elements.sensitivitySlider.value);
        this.settings.severity = this.elements.severitySelect.value;
        this.settings.theme = this.elements.themeSelect.value;
        this.settings.animations = this.elements.animationsToggle.checked;
        this.settings.sounds = this.elements.soundsToggle.checked;
        this.settings.desktopNotifications = this.elements.desktopNotifications.checked;
        this.settings.soundNotifications = this.elements.soundNotifications.checked;
        this.settings.dailyReminder = this.elements.dailyReminder.checked;
        this.settings.micShortcut = this.elements.micShortcut.value;
        this.settings.modeShortcut = this.elements.modeShortcut.value;
        
        const customWords = {
            forbidden: this.elements.customWords.value.split('\n').filter(w => w.trim()),
            allowed: this.elements.allowedWords.value.split('\n').filter(w => w.trim())
        };
        
        storage.saveSettings(this.settings);
        storage.saveCustomWords(customWords);
        
        voiceManager.loadSettings(this.settings);
        insultDetector.setLanguage(this.settings.language);
        insultDetector.setSensitivity(this.settings.sensitivity);
        insultDetector.setSeverity(this.settings.severity);
        insultDetector.customWords = customWords;
        notifications.updateSettings(this.settings);
        
        notifications.success('Paramètres Enregistrés', 'Vos paramètres ont été sauvegardés avec succès');
    }
    
    resetSettings() {
        this.settings = storage.defaultSettings;
        storage.saveSettings(this.settings);
        this.loadSettings();
        
        notifications.info('Paramètres Réinitialisés', 'Les paramètres par défaut ont été restaurés');
    }
    
    exportData() {
        const data = storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `vocal-coach-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        notifications.success('Export Réussi', 'Vos données ont été exportées');
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const success = storage.importData(event.target.result);
                
                if (success) {
                    this.loadSettings();
                    notifications.success('Import Réussi', 'Vos données ont été importées');
                } else {
                    notifications.error('Import Échoué', 'Impossible d\'importer les données');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    resetData() {
        if (confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
            storage.clearAll();
            this.loadSettings();
            
            notifications.warning('Données Supprimées', 'Toutes vos données ont été supprimées');
            
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
    
    applyTheme() {
        const theme = this.settings.theme;
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }
    
    applyAnimations() {
        if (!this.settings.animations) {
            document.documentElement.setAttribute('data-no-animations', 'true');
        } else {
            document.documentElement.removeAttribute('data-no-animations');
        }
    }
    
    getSettings() {
        return this.settings;
    }
    
    updateSettings(updates) {
        this.settings = { ...this.settings, ...updates };
        storage.saveSettings(this.settings);
    }
}

const settingsManager = new SettingsManager();

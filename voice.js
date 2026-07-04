class VoiceManager {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.currentTranscript = '';
        this.onResult = null;
        this.onError = null;
        this.onStart = null;
        this.onEnd = null;
        
        this.settings = {
            voice: 'default',
            volume: 0.8,
            rate: 1,
            pitch: 1,
            language: 'fr-FR'
        };
        
        this.voices = [];
        this.loadVoices();
        
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.loadVoices();
        }
        
        this.initializeRecognition();
    }
    
    loadVoices() {
        this.voices = this.synthesis.getVoices();
    }
    
    initializeRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported');
            return false;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.settings.language;
        this.recognition.maxAlternatives = 3;
        
        this.recognition.onstart = () => {
            this.isListening = true;
            if (this.onStart) this.onStart();
        };
        
        this.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            this.currentTranscript = finalTranscript || interimTranscript;
            
            if (this.onResult) {
                this.onResult({
                    final: finalTranscript,
                    interim: interimTranscript,
                    transcript: this.currentTranscript
                });
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            
            if (event.error === 'no-speech') {
                this.restartRecognition();
            } else if (event.error === 'network') {
                if (this.onError) this.onError('network');
            } else if (event.error === 'not-allowed') {
                if (this.onError) this.onError('permission');
            } else {
                if (this.onError) this.onError(event.error);
            }
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            if (this.onEnd) this.onEnd();
            
            if (this.shouldKeepListening) {
                this.restartRecognition();
            }
        };
        
        return true;
    }
    
    startListening() {
        if (!this.recognition) {
            console.error('Speech recognition not initialized');
            return false;
        }
        
        try {
            this.shouldKeepListening = true;
            this.recognition.start();
            return true;
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            return false;
        }
    }
    
    stopListening() {
        if (!this.recognition) {
            return false;
        }
        
        try {
            this.shouldKeepListening = false;
            this.recognition.stop();
            return true;
        } catch (error) {
            console.error('Error stopping speech recognition:', error);
            return false;
        }
    }
    
    restartRecognition() {
        if (this.shouldKeepListening && !this.isListening) {
            setTimeout(() => {
                try {
                    this.recognition.start();
                } catch (error) {
                    console.error('Error restarting recognition:', error);
                }
            }, 100);
        }
    }
    
    speak(text, options = {}) {
        if (!this.synthesis) {
            console.error('Speech synthesis not supported');
            return false;
        }
        
        this.synthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        utterance.voice = this.getVoice(options.voice || this.settings.voice);
        utterance.volume = options.volume !== undefined ? options.volume : this.settings.volume;
        utterance.rate = options.rate !== undefined ? options.rate : this.settings.rate;
        utterance.pitch = options.pitch !== undefined ? options.pitch : this.settings.pitch;
        utterance.lang = options.language || this.settings.language;
        
        utterance.onstart = () => {
            this.isSpeaking = true;
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            this.isSpeaking = false;
        };
        
        this.synthesis.speak(utterance);
        return true;
    }
    
    stopSpeaking() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.isSpeaking = false;
        }
    }
    
    getVoice(voiceName) {
        if (voiceName === 'default') {
            return this.voices.find(voice => voice.lang.startsWith(this.settings.language)) || this.voices[0];
        }
        
        return this.voices.find(voice => voice.name === voiceName) || this.voices[0];
    }
    
    getVoices() {
        return this.voices;
    }
    
    getVoicesByLanguage(language) {
        return this.voices.filter(voice => voice.lang.startsWith(language));
    }
    
    setVoice(voiceName) {
        this.settings.voice = voiceName;
    }
    
    setVolume(volume) {
        this.settings.volume = Math.max(0, Math.min(1, volume));
    }
    
    setRate(rate) {
        this.settings.rate = Math.max(0.5, Math.min(2, rate));
    }
    
    setPitch(pitch) {
        this.settings.pitch = Math.max(0.5, Math.min(2, pitch));
    }
    
    setLanguage(language) {
        this.settings.language = language;
        if (this.recognition) {
            this.recognition.lang = language;
        }
    }
    
    loadSettings(settings) {
        if (settings.voice) this.setVoice(settings.voice);
        if (settings.volume) this.setVolume(settings.volume);
        if (settings.rate) this.setRate(settings.rate);
        if (settings.pitch) this.setPitch(settings.pitch);
        if (settings.language) this.setLanguage(settings.language);
    }
    
    isSupported() {
        return !!(this.recognition && this.synthesis);
    }
    
    hasMicrophonePermission() {
        return new Promise((resolve) => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                resolve(false);
                return;
            }
            
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    stream.getTracks().forEach(track => track.stop());
                    resolve(true);
                })
                .catch(() => resolve(false));
        });
    }
    
    requestMicrophonePermission() {
        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                stream.getTracks().forEach(track => track.stop());
                return true;
            })
            .catch(error => {
                console.error('Microphone permission denied:', error);
                return false;
            });
    }
    
    getCurrentTranscript() {
        return this.currentTranscript;
    }
    
    clearTranscript() {
        this.currentTranscript = '';
    }
    
    setOnResult(callback) {
        this.onResult = callback;
    }
    
    setOnError(callback) {
        this.onError = callback;
    }
    
    setOnStart(callback) {
        this.onStart = callback;
    }
    
    setOnEnd(callback) {
        this.onEnd = callback;
    }
}

const voiceManager = new VoiceManager();

/**
 * Vocal Coach - Module Voix & Reconnaissance (Version Mobile Sécurité Absolue)
 * Bloque strictement toute captation de texte pendant que l'IA parle pour éviter l'écho.
 */

const VoiceManager = {
    recognition: null,
    isListening: false,
    silenceTimer: null,
    isAITalking: false, // <-- Verrou absolu anti-écho

    init() {
        this.initSpeechRecognition();
        this.setupMobileEvents();
        this.setupKeyboardInput();
        console.log("🎙️ Module Voice (Version Sécurité Absolue) initialisé.");
    },

    /**
     * Initialise la reconnaissance vocale en mode compatible mobile
     */
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn("La reconnaissance vocale n'est pas supportée sur ce navigateur mobile.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'fr-FR';
        this.recognition.continuous = false; 
        this.recognition.interimResults = false;

        this.recognition.onresult = async (event) => {
            // SÉCURITÉ RADICALE : Si l'IA parle, on ignore complètement ce que le micro capte
            if (this.isAITalking) {
                console.log("🚫 Texte ignoré car l'IA parle actuellement.");
                return;
            }

            const transcript = event.results[0][0].transcript;
            console.log("Texte capté par le micro :", transcript);
            this.sendToCoach(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error("Erreur micro mobile :", event.error);
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    },

    /**
     * Envoie le texte au fichier ai.js et traite la réponse du dialogue
     */
    sendToCoach(text) {
        if (this.isAITalking) return; // Sécurité supplémentaire

        if (typeof aiCoach !== 'undefined' && typeof aiCoach.processTranscript === 'function') {
            const result = aiCoach.processTranscript(text);
            this.handleCoachResponse(result);
        } else {
            console.error("Erreur : L'instance 'aiCoach' de ai.js est introuvable.");
        }
    },

    /**
     * Attache les événements tactiles au bouton Micro (Optimisé pour mobiles)
     */
    setupMobileEvents() {
        const micBtn = document.getElementById('mic-btn') || document.querySelector('.mic-button');
        
        if (micBtn) {
            const startEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
            
            micBtn.addEventListener(startEvent, (e) => {
                e.preventDefault(); 
                this.unlockMobileAudio();

                if (this.isListening) {
                    this.stopListening();
                } else {
                    this.startListening();
                }
            });
        }
    },

    /**
     * Gère l'envoi des messages écrits depuis le clavier du téléphone
     */
    setupKeyboardInput() {
        const inputField = document.getElementById('chat-input') || document.querySelector('.chat-input fieldset input, #message-input');
        const sendBtn = document.getElementById('send-btn') || document.querySelector('.send-button');

        if (!inputField) return;

        const handleSend = () => {
            const text = inputField.value.trim();
            if (text) {
                this.unlockMobileAudio();
                this.sendToCoach(text);
                inputField.value = ''; 
                inputField.blur(); // Range le clavier virtuel
            }
        };

        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleSend();
            });
        }

        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    },

    /**
     * Force le déblocage du haut-parleur sur mobile
     */
    unlockMobileAudio() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('');
            window.speechSynthesis.speak(utterance);
        }
    },

    /**
     * Démarre l'écoute
     */
    startListening() {
        if (!this.recognition) return;

        // On refuse d'ouvrir le micro si l'IA parle
        if (this.isAITalking || ('speechSynthesis' in window && window.speechSynthesis.speaking)) {
            console.log("🚫 Micro bloqué : l'IA parle actuellement.");
            return;
        }

        try {
            this.recognition.start();
            this.isListening = true;
            this.updateUI(true);
            
            this.silenceTimer = setTimeout(() => {
                this.stopListening();
            }, 6000);
        } catch (e) {
            console.error("Impossible de lancer le micro :", e);
            this.stopListening();
        }
    },

    /**
     * Arrête l'écoute du micro
     */
    stopListening() {
        if (!this.isListening) return;
        clearTimeout(this.silenceTimer);
        try {
            this.recognition.stop();
        } catch(e) {}
        this.isListening = false;
        this.updateUI(false);
    },

    /**
     * Traite la réponse et lance la synthèse vocale
     */
    handleCoachResponse(result) {
        if (!result) return;
        
        let textToSpeak = "";
        
        if (result.type === 'insult') {
            textToSpeak = result.response;
        } else if (result.type === 'normal' && result.response) {
            textToSpeak = result.response;
        } else if (result.type === 'success') {
            textToSpeak = result.response;
        }

        if (textToSpeak) {
            this.speak(textToSpeak);
        }
        
        // Auto-défilement pour le mobile
        setTimeout(() => {
            const chatBox = document.getElementById('chat-box') || document.querySelector('.chat-messages, .chat-history');
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
                chatBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 150);
    },

    /**
     * Synthèse vocale avec verrouillage total
     */
    speak(text) {
        if (!('speechSynthesis' in window)) return;

        // 1. VERROUILLAGE : On coupe le micro et on active le bouclier anti-écho
        this.isAITalking = true;
        this.stopListening();
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; 
        utterance.pitch = 1.0;

        // 2. DÉVERROUILLAGE : Quand l'IA a VRAIMENT fini de parler
        utterance.onend = () => {
            console.log("🔊 L'IA a fini de parler. Désactivation du verrou.");
            // On attend une demi-seconde de sécurité (le temps que le haut-parleur s'éteigne bien)
            setTimeout(() => {
                this.isAITalking = false;
            }, 500);
        };

        utterance.onerror = () => {
            console.log("Erreur de synthèse vocale.");
            this.isAITalking = false;
            this.stopListening();
        };

        window.speechSynthesis.speak(utterance);
    },

    /**
     * Change l'aspect visuel du bouton
     */
    updateUI(active) {
        const micBtn = document.getElementById('mic-btn') || document.querySelector('.mic-button');
        if (micBtn) {
            if (active) {
                micBtn.classList.add('recording');
                micBtn.style.backgroundColor = '#ff4d4d';
            } else {
                micBtn.classList.remove('recording');
                micBtn.style.backgroundColor = '';
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    VoiceManager.init();
});

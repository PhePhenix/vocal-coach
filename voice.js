/**
 * Vocal Coach - Module Voix & Reconnaissance (Version Mobile Intégrale)
 * Gère le micro (actions tactiles) et les entrées clavier adaptées aux smartphones.
 */

const VoiceManager = {
    recognition: null,
    isListening: false,
    silenceTimer: null,

    init() {
        this.initSpeechRecognition();
        this.setupMobileEvents();
        this.setupKeyboardInput(); // <-- Ligne ajoutée pour ne rien oublier
        console.log("🎙️ Module Voice (Version Mobile Intégrale) initialisé.");
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
        if (typeof aiCoach !== 'undefined' && typeof aiCoach.processTranscript === 'function') {
            const result = aiCoach.processTranscript(text);
            this.handleCoachResponse(result);
        } else {
            console.error("Erreur : L'instance 'aiCoach' de ai.js est introuvable.");
        }
    },

    /**
     * Attache les événements tactiles au bouton Micro (Optimisé pour les pouces)
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

        // Fonction locale pour valider et envoyer le texte écrit
        const handleSend = () => {
            const text = inputField.value.trim();
            if (text) {
                this.unlockMobileAudio();
                this.sendToCoach(text);
                inputField.value = ''; // Vide le champ après envoi
                
                // Force le clavier mobile à se ranger si l'utilisateur a fini
                inputField.blur(); 
            }
        };

        // Déclenchement au clic sur le bouton d'envoi
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleSend();
            });
        }

        // Déclenchement quand l'utilisateur appuie sur "Entrée" ou "Accéder" sur son clavier mobile
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    },

    /**
     * Force le déblocage du haut-parleur sur iPhone/Safari
     */
    unlockMobileAudio() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('');
            window.speechSynthesis.speak(utterance);
        }
    },

    startListening() {
        if (!this.recognition) return;
        try {
            this.recognition.start();
            this.isListening = true;
            this.updateUI(true);
            
            this.silenceTimer = setTimeout(() => {
                this.stopListening();
            }, 6000);
        } catch (e) {
            console.error("Impossible de lancer le micro :", e);
        }
    },

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
     * Traite la réponse et force le scroll pour éviter les bugs de clavier virtuel
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
        
        // Système d'auto-défilement ultra-précis pour le mobile
        setTimeout(() => {
            const chatBox = document.getElementById('chat-box') || document.querySelector('.chat-messages, .chat-history');
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
                chatBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 150);
    },

    speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; 
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    },

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
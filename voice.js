/**
 * Vocal Coach - Module Voix & Reconnaissance (Version Finale et Sécurisée)
 * Gère le micro, la synthèse vocale avec coupure automatique et les entrées clavier.
 */

const VoiceManager = {
    recognition: null,
    isListening: false,
    silenceTimer: null,
    isAITalking: false, // Double verrou anti-écho matériel pour mobile

    /**
     * Initialisation globale du module
     */
    init() {
        this.initSpeechRecognition();
        this.setupMobileEvents();
        this.setupKeyboardInput();
        console.log("🎙️ Module Voice Mobile (Anti-Écho & Sécurisé) initialisé.");
    },

    /**
     * Initialise l'API de reconnaissance vocale du navigateur
     */
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'fr-FR';
        this.recognition.continuous = false; 
        this.recognition.interimResults = false;

        // Déclenché quand le téléphone a fini de capter une phrase
        this.recognition.onresult = async (event) => {
            // VERROU ABSOLU : Si l'IA parle, on détruit et on ignore la capture sonore
            if (this.isAITalking) {
                console.log("🚫 Texte ignoré : l'IA est en train de parler.");
                return;
            }

            try {
                const transcript = event.results[0][0].transcript;
                console.log("Texte capté par le micro :", transcript);
                this.sendToCoach(transcript);
            } catch (err) {
                console.error("Erreur lors de la récupération du texte :", err);
            }
        };

        this.recognition.onerror = (event) => {
            console.error("Erreur micro ou permission :", event.error);
            this.stopListening();
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    },

    /**
     * Envoie de manière sécurisée le texte récupéré à la logique de ai.js
     */
    sendToCoach(text) {
        if (this.isAITalking || !text) return;

        // Vérification de sécurité : est-ce que le fichier ai.js est bien chargé ?
        if (typeof aiCoach !== 'undefined' && typeof aiCoach.processTranscript === 'function') {
            try {
                const result = aiCoach.processTranscript(text);
                this.handleCoachResponse(result);
            } catch (err) {
                console.error("Erreur lors de l'analyse par ai.js :", err);
            }
        } else {
            console.error("Erreur critique : L'instance 'aiCoach' du fichier ai.js est introuvable ou mal initialisée.");
            // Secours visuel si le script IA est cassé
            this.speak("Désolé, mon système d'analyse rencontre une erreur.");
        }
    },

    /**
     * Attache les événements tactiles au bouton Micro (Optimisé pour les mobiles)
     */
    setupMobileEvents() {
        const micBtn = document.getElementById('mic-btn') || document.querySelector('.mic-button');
        
        if (micBtn) {
            // Utilise 'touchstart' sur mobile pour éviter la latence de 300ms du 'click'
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
     * Gère l'envoi des messages écrits depuis le clavier (Utile sur PC Windows)
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
                inputField.blur(); // Ferme le clavier virtuel sur mobile
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
     * Débloque le canal audio des téléphones (iOS/Android requièrent une action utilisateur)
     */
    unlockMobileAudio() {
        if ('speechSynthesis' in window) {
            try {
                const utterance = new SpeechSynthesisUtterance('');
                window.speechSynthesis.speak(utterance);
            } catch(e) {}
        }
    },

    /**
     * Démarre l'écoute du microphone
     */
    startListening() {
        if (!this.recognition) {
            console.warn("Reconnaissance vocale indisponible.");
            return;
        }

        // On refuse d'ouvrir le micro si l'IA parle
        if (this.isAITalking || ('speechSynthesis' in window && window.speechSynthesis.speaking)) {
            console.log("🚫 Micro bloqué : l'IA parle actuellement.");
            return;
        }

        try {
            this.recognition.start();
            this.isListening = true;
            this.updateUI(true);
            
            // Sécurité : si l'utilisateur ne dit rien pendant 6 secondes, on coupe pour économiser la batterie
            this.silenceTimer = setTimeout(() => {
                this.stopListening();
            }, 6000);
        } catch (e) {
            console.error("Impossible de lancer le micro :", e);
            this.stopListening();
        }
    },

    /**
     * Arrête proprement l'écoute du micro
     */
    stopListening() {
        if (!this.isListening) return;
        if (this.silenceTimer) clearTimeout(this.silenceTimer);
        
        try {
            this.recognition.stop();
        } catch(e) {}
        
        this.isListening = false;
        this.updateUI(false);
    },

    /**
     * Reçoit la réponse de l'IA et prépare sa lecture vocale
     */
    handleCoachResponse(result) {
        if (!result) return;
        
        // On extrait le texte peu importe le type de réponse retourné par l'IA
        let textToSpeak = result.response || "";
        
        if (textToSpeak) {
            this.speak(textToSpeak);
        }
        
        // Force le scroll automatique vers le bas pour voir le texte sur mobile
        setTimeout(() => {
            const chatBox = document.getElementById('chat-box') || document.querySelector('.chat-messages, .chat-history');
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
                chatBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 150);
    },

    /**
     * Synthèse vocale avec coupure stricte et verrou matériel (Anti-écho)
     */
    speak(text) {
        if (!('speechSynthesis' in window)) return;

        // 1. Enclenchement du bouclier anti-écho
        this.isAITalking = true;
        this.stopListening();
        window.speechSynthesis.cancel(); // Stoppe toute voix en cours

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; 
        utterance.pitch = 1.0;

        // 2. Extinction du bouclier quand la phrase est finie
        utterance.onend = () => {
            console.log("🔊 L'IA a fini de parler.");
            // Petit délai de sécurité de 500ms avant de libérer le micro
            setTimeout(() => {
                this.isAITalking = false;
            }, 500);
        };

        utterance.onerror = () => {
            console.log("Erreur ou interruption de la synthèse vocale.");
            this.isAITalking = false;
            this.stopListening();
        };

        window.speechSynthesis.speak(utterance);
    },

    /**
     * Gère le changement d'état visuel du bouton (Rouge/Vert)
     */
    updateUI(active) {
        const micBtn = document.getElementById('mic-btn') || document.querySelector('.mic-button');
        if (micBtn) {
            if (active) {
                micBtn.classList.add('recording');
                micBtn.style.backgroundColor = '#ff4d4d'; // Rouge enregistrement
            } else {
                micBtn.classList.remove('recording');
                micBtn.style.backgroundColor = ''; // Reprend la couleur définie dans le CSS
            }
        }
    }
};

// Lancement automatique au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    VoiceManager.init();
});

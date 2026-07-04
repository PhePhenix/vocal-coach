/**
 * Vocal Coach - Module IA & Dialogue Continu
 * Version réécrite et enrichie combinant les règles de base et la gestion de conversation.
 */
class AICoach {
    constructor() {
        this.mode = 'normal';
        this.consecutiveInsults = 0;
        this.lastInsult = null;
        this.conversationHistory = [];
        this.userProgress = storage.getUserProgress();
        this.settings = storage.getSettings();
        
        this.responses = {
            firstInsult: [
                'Essaie de reformuler sans utiliser d\'insulte.',
                'Pourrais-tu reformuler cette phrase sans insulte ?',
                'Je t\'invite à trouver une formulation plus respectueuse.',
                'Essaie de dire la même chose sans utiliser ce mot.',
                'Comment pourrais-tu exprimer cela différemment ?',
                'Trouve une façon de dire cela qui soit plus polie.',
                'Je suis sûr que tu peux formuler cela mieux.',
                'Essaie d\'utiliser un vocabulaire plus approprié.',
                'Reformule ta phrase sans l\'insulte, s\'il te plaît.',
                'Comment pourrais-tu dire cela de manière plus constructive ?'
            ],
            secondInsult: [
                'Tu viens encore d\'utiliser une insulte. Reformule ta phrase.',
                'Je t\'ai déjà demandé de reformuler sans insulte. Essaie encore.',
                'Cette formulation contient encore une insulte. Recommence.',
                'Je ne peux pas accepter cette formulation. Essaie encore.',
                'Tu utilises encore des insultes. Fais un effort, s\'il te plaît.',
                'Je t\'encourage à trouver une meilleure formulation.',
                'Cette phrase contient toujours une insulte. Change-la.',
                'Je suis sûr que tu peux faire mieux que ça.',
                'Essaie encore, sans utiliser d\'insulte cette fois.',
                'Concentre-toi et trouve une formulation appropriée.'
            ],
            thirdInsult: [
                'Je n\'accepterai pas cette formulation. Recommence correctement.',
                'C\'est la troisième fois. Il faut vraiment que tu reformules.',
                'Je ne peux pas avancer tant que tu n\'as pas reformulé.',
                'Cette phrase est inacceptable. Trouve une autre façon de dire cela.',
                'Je t\'ai déjà demandé plusieurs fois. Fais un vrai effort.',
                'Il est important que tu changes ta façon de t\'exprimer.',
                'Je ne vais pas accepter cette formulation. Essaie encore.',
                'Tu dois sérieusement travailler sur ton langage.',
                'Cette formulation n\'est pas acceptable. Change-la.',
                'Je compte sur toi pour trouver une meilleure expression.'
            ],
            persistentInsult: [
                'Je vais continuer à te le demander tant que tu n\'auras pas reformulé.',
                'Je ne vais pas abandonner. Reformule cette phrase.',
                'Chaque fois que tu utilises une insulte, je te le ferai remarquer.',
                'Je suis là pour t\'aider à progresser. Reformule correctement.',
                'Je vais insister jusqu\'à ce que tu trouves la bonne formulation.',
                'Ne baisse pas les bras. Trouve une meilleure façon de dire cela.',
                'Je suis patient, mais je ne céderai pas. Reformule.',
                'Ton langage peut s\'améliorer. Essaie encore.',
                'Je vais continuer à te guider vers une meilleure expression.',
                'Ne te décourage pas, mais reformule correctement.'
            ],
            successfulReformulation: [
                'Excellent ! C\'est une bien meilleure formulation.',
                'Bravo ! Tu as trouvé une excellente reformulation.',
                'Parfait ! C\'est beaucoup plus respectueux.',
                'Très bien ! Continue comme ça.',
                'Super ! Tu fais des progrès remarquables.',
                'Formidable ! C\'est exactement ce que je cherchais.',
                'Magnifique ! Ton langage s\'ameliore.',
                'Génial ! Tu as compris le principe.',
                'Fantastique ! Continue tes efforts.',
                'Parfait ! Je suis fier de tes progrès.'
            ],
            encouragement: [
                'Tu es sur la bonne voie, continue comme ça !',
                'Chaque reformulation est une victoire !',
                'Tes progrès sont remarquables, continue !',
                'Tu deviens de plus en plus maîtrisé dans ton expression.',
                'Je vois que tu fais des efforts sérieux, continue !',
                'Ton langage s\'améliore chaque jour, bravo !',
                'Tu es en train de changer tes habitudes positivement !',
                'Chaque mot compte, et tu le fais très bien !',
                'Ta persévérance va payer, continue !',
                'Tu es sur le point d\'atteindre tes objectifs !'
            ],
            explanation: [
                'Cette reformulation est plus respectueuse et professionnelle.',
                'Cette formulation exprime la même idée sans être offensante.',
                'Ce choix de mots montre plus de maturité et de considération.',
                'Cette version est plus appropriée pour la communication.',
                'Cette reformulation permet de transmettre ton message sans heurter.',
                'Cette formulation est plus constructive et positive.',
                'Cette version démontre un meilleur vocabulaire.',
                'Cette reformulation favorise une communication harmonieuse.',
                'Cette formulation est plus adaptée au contexte social.',
                'Cette version montre que tu sais t\'exprimer avec élégance.'
            ],
            strictMode: [
                'En mode strict, je ne peux pas accepter cette formulation.',
                'Le mode strict exige une reformulation immédiate.',
                'En mode strict, toute insulte bloque la conversation.',
                'Cette phrase est inacceptable en mode strict. Reformule.',
                'Le mode strict ne tolère aucune insulte. Recommence.',
                'En mode strict, je refuse de continuer tant que tu n\'as pas reformulé.',
                'Cette formulation viole les règles du mode strict.',
                'Le mode strict exige un langage impeccable. Reformule.',
                'En mode strict, chaque mot compte. Essaie encore.',
                'Cette phrase n\'est pas conforme au mode strict. Change-la.'
            ],
            childMode: [
                'Dis-moi plutôt quelque chose de gentil.',
                'On peut dire ça autrement, sans ce mot.',
                'Essaie de trouver un mot plus gentil.',
                'Je suis sûr que tu peux dire ça plus joliment.',
                'Utilisons des mots qui font du bien autour de nous.',
                'Comment on pourrait dire ça autrement ?',
                'Trouve un mot qui fait sourire au lieu de ça.',
                'On peut être gentil même quand on est énervé.',
                'Essaie de dire ça avec des mots magiques.',
                'Je sais que tu peux trouver des mots plus gentils.'
            ],
            adultMode: [
                'En tant qu\'adulte, tu peux t\'exprimer avec plus de maturité.',
                'Ton langage devrait refléter ton âge et ton expérience.',
                'Tu es capable d\'une expression plus sophistiquée.',
                'Fais preuve de la maturité qui est la tienne.',
                'Ton vocabulaire peut être plus riche et nuancé.',
                'En tant qu\'adulte, tu as les moyens de t\'exprimer mieux.',
                'Montre ton niveau d\'éducation par ton langage.',
                'Tu as l\'expérience nécessaire pour mieux t\'exprimer.',
                'Fais preuve de la sophistication qui te caractérise.',
                'Ton langage devrait être à la hauteur de ton statut.'
            ],
            trainingMode: [
                'C\'est un entraînement. Chaque reformulation compte.',
                'Entraîne-toi à trouver des alternatives positives.',
                'C\'est le moment de pratiquer un langage respectueux.',
                'Considère cela comme un exercice de vocabulaire.',
                'Entraîne-toi à exprimer tes émotions différemment.',
                'C\'est une opportunité d\'améliorer ton expression.',
                'Pratique la reformulation à chaque occasion.',
                'Chaque phrase est une occasion de t\'entraîner.',
                'Utilise ce moment pour développer ton vocabulaire.',
                'C\'est un entraînement progressif, sois patient.'
            ],
            greeting: [
                'Bonjour ! Je suis ton coach vocal. Je vais t\'aider à éliminer les insultes de ton langage. Parle naturellement, je t\'écoute.',
                'Salut ! Je suis ici pour t\'accompagner dans l\'amélioration de ton langage. Dis-moi ce que tu as en tête.',
                'Bonjour ! Ensemble, nous allons travailler sur ton expression. N\'hésite pas à parler naturellement.',
                'Hey ! Je suis ton coach personnel pour un langage plus respectueux. Je suis prêt à t\'écouter.',
                'Bienvenue ! Je suis là pour t\'aider à communiquer mieux. Commence quand tu veux.',
                'Bonjour ! Ton voyage vers un langage plus positif commence maintenant. Je suis là pour t\'aider.',
                'Salut ! Prêt à améliorer ta façon de t\'exprimer ? Je suis à ton écoute.',
                'Bonjour ! Je suis ton coach de langage. Ensemble, nous allons faire des progrès.',
                'Hey ! Bienvenue dans ton espace d\'entraînement linguistique. Je suis là pour t\'aider.',
                'Bonjour ! Je suis ravi de t\'accompagner dans cette démarche. Parle librement.'
            ],
            progress: [
                'Tu avez fait {insults} insultes aujourd\'hui. Continue tes efforts !',
                'Ton score de politesse est de {score}/100. Tu progresses bien !',
                'Tu es en série depuis {streak} jours sans insulte. Excellent !',
                'Tu as reformulé {reformulations} phrases avec succès. Bravo !',
                'Ton niveau actuel est {level}. Continue à t\'améliorer !',
                'Tu as gagné {xp} XP récemment. Super progrès !',
                'Tu as complété {challenges} défis. Continue comme ça !',
                'Ton temps sans insulte est de {time}. Impressionnant !',
                'Tu as obtenu {badges} badges. Tu es sur la bonne voie !',
                'Tes statistiques montrent une nette amélioration. Bravo !'
            ]
        };
        
        this.loadSession();
    }
    
    loadSession() {
        const session = storage.getSession();
        if (session) {
            this.mode = session.currentMode || 'normal';
            this.consecutiveInsults = session.consecutiveInsults || 0;
            this.lastInsult = session.lastInsult || null;
        }
    }
    
    saveSession() {
        storage.updateSession({
            currentMode: this.mode,
            consecutiveInsults: this.consecutiveInsults,
            lastInsult: this.lastInsult
        });
    }
    
    setMode(mode) {
        this.mode = mode;
        this.saveSession();
    }
    
    getMode() {
        return this.mode;
    }
    
    processTranscript(transcript) {
        const detection = insultDetector.detectInsult(transcript);
        
        if (detection) {
            return this.handleInsult(detection, transcript);
        } else {
            this.consecutiveInsults = 0;
            this.saveSession();
            return this.handleNormalSpeech(transcript);
        }
    }
    
    handleInsult(detection, transcript) {
        this.consecutiveInsults++;
        this.lastInsult = {
            insult: detection.insult,
            context: detection.context,
            timestamp: new Date().toISOString()
        };
        this.saveSession();
        
        const response = this.generateInsultResponse(detection);
        const suggestions = reformulationEngine.getMultipleReformulations(detection.insult, 3);
        
        storage.addInsult({
            insult: detection.insult,
            context: detection.context,
            originalText: transcript,
            confidence: detection.confidence
        });
        
        storage.updateStatistics({
            totalInsults: storage.getStatistics().totalInsults + 1,
            insultsToday: storage.getStatistics().insultsToday + 1,
            lastInsultDate: new Date().toISOString()
        });
        
        storage.addHistoryItem({
            type: 'insult',
            content: detection.insult,
            context: detection.context
        });
        
        return {
            type: 'insult',
            insult: detection.insult,
            context: detection.context,
            response: response,
            suggestions: suggestions,
            consecutive: this.consecutiveInsults
        };
    }
    
    handleNormalSpeech(transcript) {
        this.conversationHistory.push({
            type: 'user',
            text: transcript,
            timestamp: new Date().toISOString()
        });
        
        if (this.conversationHistory.length > 50) {
            this.conversationHistory.shift();
        }
        
        const response = this.generateNormalResponse(transcript);
        
        return {
            type: 'normal',
            transcript: transcript,
            response: response
        };
    }
    
    generateInsultResponse(detection) {
        let responses;
        
        switch (this.mode) {
            case 'strict':
                responses = this.responses.strictMode;
                break;
            case 'child':
                responses = this.responses.childMode;
                break;
            case 'adult':
                responses = this.responses.adultMode;
                break;
            case 'training':
                responses = this.responses.trainingMode;
                break;
            default:
                if (this.consecutiveInsults === 1) {
                    responses = this.responses.firstInsult;
                } else if (this.consecutiveInsults === 2) {
                    responses = this.responses.secondInsult;
                } else if (this.consecutiveInsults === 3) {
                    responses = this.responses.thirdInsult;
                } else {
                    responses = this.responses.persistentInsult;
                }
        }
        
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
    
    generateNormalResponse(transcript) {
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        const lowerInput = transcript.toLowerCase().trim();
        
        // --- DEBUT LOGIQUE DE DIALOGUE CONTINU AJOUTÉE ---
        // Réponses contextuelles pour simuler une véritable interaction
        if (lowerInput.includes("bonjour") || lowerInput.includes("salut") || lowerInput.includes("hey")) {
            return this.mode === 'child' ? "Salut à toi ! Comment se passe ta journée sans gros mots ?" : "Bonjour ! Comment se passe votre entraînement aujourd'hui ?";
        }
        
        if (lowerInput.includes("ça va") || lowerInput.includes("comment tu vas")) {
            return "Je vais très bien ! Toujours disponible pour analyser votre élocution. Et de votre côté, comment allez-vous ?";
        }
        
        if (lowerInput.includes("merci")) {
            return "Je vous en prie ! C'est un réel plaisir de vous accompagner vers un langage plus serein.";
        }
        
        if (lowerInput.includes("difficile") || lowerInput.includes("dur") || lowerInput.includes("j'arrive pas")) {
            return "Changer ses expressions quotidiennes demande du temps et de la patience. Ne baissez pas les bras, vous êtes là pour apprendre !";
        }

        // Si l'historique contient d'autres interactions, rebondir sur un ancien sujet
        if (this.conversationHistory.length > 3 && Math.random() < 0.3) {
            const previousUserMessage = this.conversationHistory[this.conversationHistory.length - 3].text;
            if (previousUserMessage && previousUserMessage.length > 5) {
                return `C'est très intéressant. Cela me fait penser à ce que vous disiez tout à l'heure : "${previousUserMessage}". Pouvez-vous développer dans un langage soigné ?`;
            }
        }
        // --- FIN LOGIQUE DE DIALOGUE CONTINU ---

        // Comportement adaptatif aléatoire d'origine (Statistiques & Encouragements)
        if (Math.random() < 0.1) {
            const encouragement = this.getRandomEncouragement();
            return encouragement;
        }
        
        if (this.conversationHistory.length > 5 && Math.random() < 0.2) {
            const progressMessage = this.getProgressMessage(stats, progress);
            return progressMessage;
        }
        
        // Réponse par défaut pour valider la fluidité de la discussion
        return "Je valide votre formulation. Poursuivons notre échange.";
    }
    
    handleReformulation(original, reformulation) {
        const detection = insultDetector.detectInsult(reformulation);
        
        if (!detection) {
            this.consecutiveInsults = 0;
            this.lastInsult = null;
            this.saveSession();
            
            const response = this.getRandomResponse(this.responses.successfulReformulation);
            const explanation = reformulationEngine.explainWhyBetter(original, reformulation);
            
            storage.addReformulation({
                original: original,
                reformulation: reformulation,
                successful: true
            });
            
            storage.updateStatistics({
                totalReformulations: storage.getStatistics().totalReformulations + 1,
                reformulationsToday: storage.getStatistics().reformulationsToday + 1
            });
            
            storage.addXP(10);
            
            storage.addHistoryItem({
                type: 'reformulation',
                content: `${original} → ${reformulation}`
            });
            
            return {
                type: 'success',
                response: response,
                explanation: explanation
            };
        } else {
            this.consecutiveInsults++;
            this.saveSession();
            
            const response = this.generateInsultResponse(detection);
            const suggestions = reformulationEngine.getMultipleReformulations(detection.insult, 3);
            
            return {
                type: 'failure',
                insult: detection.insult,
                response: response,
                suggestions: suggestions
            };
        }
    }
    
    getRandomResponse(responses) {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
    
    getRandomEncouragement() {
        return this.getRandomResponse(this.responses.encouragement);
    }
    
    getProgressMessage(stats, progress) {
        const templates = this.responses.progress;
        const template = this.getRandomResponse(templates);
        
        return template
            .replace('{insults}', stats.insultsToday)
            .replace('{score}', stats.politenessScore)
            .replace('{streak}', stats.currentStreak)
            .replace('{reformulations}', stats.totalReformulations)
            .replace('{level}', progress.level)
            .replace('{xp}', progress.xp)
            .replace('{challenges}', progress.completedChallenges.length)
            .replace('{time}', this.formatTime(stats.timeWithoutInsult))
            .replace('{badges}', progress.badges.length);
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }
    
    getGreeting() {
        return this.getRandomResponse(this.responses.greeting);
    }
    
    getConversationContext() {
        return this.conversationHistory.slice(-10);
    }
    
    resetConversation() {
        this.consecutiveInsults = 0;
        this.lastInsult = null;
        this.conversationHistory = [];
        this.saveSession();
    }
    
    getInsultFrequency() {
        const insults = storage.getInsults();
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        
        const recentInsults = insults.filter(insult => 
            new Date(insult.timestamp) > oneHourAgo
        );
        
        return recentInsults.length;
    }
    
    shouldIntervene() {
        if (this.mode === 'strict') {
            return true;
        }
        
        const frequency = this.getInsultFrequency();
        
        if (frequency >= 5) {
            return true;
        }
        
        if (this.consecutiveInsults >= 3) {
            return true;
        }
        
        return false;
    }
    
    getCoachingIntensity() {
        switch (this.mode) {
            case 'strict':
                return 10;
            case 'child':
                return 3;
            case 'adult':
                return 7;
            case 'training':
                return 5;
            default:
                return Math.min(5 + this.consecutiveInsults, 10);
        }
    }
    
    adaptResponseBasedOnProgress() {
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        
        if (stats.politenessScore > 80 && progress.level >= 5) {
            this.mode = 'adult';
        } else if (stats.politenessScore < 50 && progress.level < 3) {
            this.mode = 'child';
        }
        
        this.saveSession();
    }
    
    generatePersonalizedFeedback() {
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        
        const feedback = [];
        
        if (stats.insultsToday === 0) {
            feedback.push('Excellent ! Aucune insulte aujourd\'hui.');
        } else if (stats.insultsToday < 3) {
            feedback.push('Bien ! Tu as très peu d\'insultes aujourd\'hui.');
        } else if (stats.insultsToday < 10) {
            feedback.push('Tu peux encore améliorer ton langage aujourd\'hui.');
        } else {
            feedback.push('Tu as utilisé beaucoup d\'insultes aujourd\'hui. Concentre-toi davantage.');
        }
        
        if (stats.currentStreak >= 7) {
            feedback.push('Incroyable ! Tu tiens une série de plus d\'une semaine.');
        } else if (stats.currentStreak >= 3) {
            feedback.push('Bravo pour ta série de plusieurs jours.');
        }
        
        if (progress.level >= 10) {
            feedback.push('Tu as atteint un niveau avancé. Continue comme ça !');
        } else if (progress.level >= 5) {
            feedback.push('Tu progresses bien. Continue tes efforts !');
        }
        
        return feedback;
    }
}

// Initialisation globale de l'instance du coach vocal
const aiCoach = new AICoach();
class AchievementsManager {
    constructor() {
        this.badges = this.defineBadges();
        this.challenges = this.defineChallenges();
        this.userProgress = storage.getUserProgress();
        this.completedChallenges = storage.getChallenges();
    }
    
    defineBadges() {
        return [
            {
                id: 'first_reformulation',
                name: 'Première Reformulation',
                description: 'Réussir ta première reformulation',
                icon: '🎯',
                category: 'progression',
                requirement: { type: 'reformulations', value: 1 },
                xpReward: 50
            },
            {
                id: 'ten_reformulations',
                name: 'Dix Reformulations',
                description: 'Réussir 10 reformulations',
                icon: '🏆',
                category: 'progression',
                requirement: { type: 'reformulations', value: 10 },
                xpReward: 100
            },
            {
                id: 'fifty_reformulations',
                name: 'Cinquante Reformulations',
                description: 'Réussir 50 reformulations',
                icon: '🌟',
                category: 'progression',
                requirement: { type: 'reformulations', value: 50 },
                xpReward: 250
            },
            {
                id: 'hundred_reformulations',
                name: 'Cent Reformulations',
                description: 'Réussir 100 reformulations',
                icon: '💎',
                category: 'progression',
                requirement: { type: 'reformulations', value: 100 },
                xpReward: 500
            },
            {
                id: 'one_day_streak',
                name: 'Un Jour Sans Insulte',
                description: 'Tenir une journée complète sans insulte',
                icon: '🌅',
                category: 'streak',
                requirement: { type: 'streak', value: 1 },
                xpReward: 100
            },
            {
                id: 'three_day_streak',
                name: 'Trois Jours Sans Insulte',
                description: 'Tenir trois jours consécutifs sans insulte',
                icon: '🔥',
                category: 'streak',
                requirement: { type: 'streak', value: 3 },
                xpReward: 200
            },
            {
                id: 'week_streak',
                name: 'Une Semaine Sans Insulte',
                description: 'Tenir une semaine complète sans insulte',
                icon: '⭐',
                category: 'streak',
                requirement: { type: 'streak', value: 7 },
                xpReward: 500
            },
            {
                id: 'month_streak',
                name: 'Un Mois Sans Insulte',
                description: 'Tenir un mois complet sans insulte',
                icon: '👑',
                category: 'streak',
                requirement: { type: 'streak', value: 30 },
                xpReward: 1000
            },
            {
                id: 'politeness_80',
                name: 'Langage Poli',
                description: 'Atteindre un score de politesse de 80',
                icon: '🎀',
                category: 'politeness',
                requirement: { type: 'politeness', value: 80 },
                xpReward: 200
            },
            {
                id: 'politeness_90',
                name: 'Langage Très Poli',
                description: 'Atteindre un score de politesse de 90',
                icon: '🌸',
                category: 'politeness',
                requirement: { type: 'politeness', value: 90 },
                xpReward: 300
            },
            {
                id: 'politeness_100',
                name: 'Langage Parfait',
                description: 'Atteindre un score de politesse de 100',
                icon: '✨',
                category: 'politeness',
                requirement: { type: 'politeness', value: 100 },
                xpReward: 500
            },
            {
                id: 'level_5',
                name: 'Niveau 5',
                description: 'Atteindre le niveau 5',
                icon: '📈',
                category: 'level',
                requirement: { type: 'level', value: 5 },
                xpReward: 100
            },
            {
                id: 'level_10',
                name: 'Niveau 10',
                description: 'Atteindre le niveau 10',
                icon: '📊',
                category: 'level',
                requirement: { type: 'level', value: 10 },
                xpReward: 250
            },
            {
                id: 'level_25',
                name: 'Niveau 25',
                description: 'Atteindre le niveau 25',
                icon: '📉',
                category: 'level',
                requirement: { type: 'level', value: 25 },
                xpReward: 500
            },
            {
                id: 'level_50',
                name: 'Niveau 50',
                description: 'Atteindre le niveau 50',
                icon: '🏅',
                category: 'level',
                requirement: { type: 'level', value: 50 },
                xpReward: 1000
            },
            {
                id: 'first_challenge',
                name: 'Premier Défi',
                description: 'Compléter ton premier défi',
                icon: '🎪',
                category: 'challenges',
                requirement: { type: 'challenges', value: 1 },
                xpReward: 100
            },
            {
                id: 'five_challenges',
                name: 'Cinq Défis',
                description: 'Compléter 5 défis',
                icon: '🎭',
                category: 'challenges',
                requirement: { type: 'challenges', value: 5 },
                xpReward: 300
            },
            {
                id: 'ten_challenges',
                name: 'Dix Défis',
                description: 'Compléter 10 défis',
                icon: '🎨',
                category: 'challenges',
                requirement: { type: 'challenges', value: 10 },
                xpReward: 500
            },
            {
                id: 'early_bird',
                name: 'Lève-Tôt',
                description: 'Utiliser l\'application avant 8h du matin',
                icon: '🐦',
                category: 'special',
                requirement: { type: 'special', value: 'early_bird' },
                xpReward: 50
            },
            {
                id: 'night_owl',
                name: 'Noctambule',
                description: 'Utiliser l\'application après 22h',
                icon: '🦉',
                category: 'special',
                requirement: { type: 'special', value: 'night_owl' },
                xpReward: 50
            },
            {
                id: 'dedicated',
                name: 'Dévoué',
                description: 'Utiliser l\'application 7 jours de suite',
                icon: '💪',
                category: 'special',
                requirement: { type: 'special', value: 'dedicated' },
                xpReward: 200
            },
            {
                id: 'perfectionist',
                name: 'Perfectionniste',
                description: 'Avoir un score de politesse de 100 pendant 3 jours',
                icon: '💯',
                category: 'special',
                requirement: { type: 'special', value: 'perfectionist' },
                xpReward: 500
            },
            {
                id: 'social_butterfly',
                name: 'Papillon Social',
                description: 'Partager tes progrès 5 fois',
                icon: '🦋',
                category: 'social',
                requirement: { type: 'social', value: 5 },
                xpReward: 150
            },
            {
                id: 'mentor',
                name: 'Mentor',
                description: 'Aider 3 personnes à améliorer leur langage',
                icon: '🤝',
                category: 'social',
                requirement: { type: 'social', value: 3 },
                xpReward: 300
            },
            {
                id: 'vocabulary_master',
                name: 'Maître du Vocabulaire',
                description: 'Utiliser 50 reformulations différentes',
                icon: '📚',
                category: 'vocabulary',
                requirement: { type: 'vocabulary', value: 50 },
                xpReward: 400
            },
            {
                id: 'quick_learner',
                name: 'Apprentissage Rapide',
                description: 'Réussir 5 reformulations en une heure',
                icon: '⚡',
                category: 'special',
                requirement: { type: 'special', value: 'quick_learner' },
                xpReward: 150
            },
            {
                id: 'patience_master',
                name: 'Maître de la Patience',
                description: 'Attendre 10 minutes sans utiliser d\'insulte',
                icon: '🧘',
                category: 'special',
                requirement: { type: 'special', value: 'patience_master' },
                xpReward: 200
            },
            {
                id: 'consistency_king',
                name: 'Roi de la Consistance',
                description: 'Avoir une série de 30 jours',
                icon: '👑',
                category: 'streak',
                requirement: { type: 'streak', value: 30 },
                xpReward: 1000
            }
        ];
    }
    
    defineChallenges() {
        return [
            {
                id: 'no_insult_hour',
                name: 'Une Heure Sans Insulte',
                description: 'Ne pas utiliser d\'insulte pendant 1 heure',
                duration: 3600,
                reward: { xp: 50, type: 'instant' },
                category: 'daily'
            },
            {
                id: 'no_insult_day',
                name: 'Une Journée Sans Insulte',
                description: 'Ne pas utiliser d\'insulte pendant toute la journée',
                duration: 86400,
                reward: { xp: 200, type: 'daily' },
                category: 'daily'
            },
            {
                id: 'five_reformulations',
                name: 'Cinq Reformulations',
                description: 'Réussir 5 reformulations',
                requirement: { type: 'reformulations', value: 5 },
                reward: { xp: 100, type: 'instant' },
                category: 'daily'
            },
            {
                id: 'politeness_85',
                name: 'Score de Politesse 85',
                description: 'Atteindre un score de politesse de 85',
                requirement: { type: 'politeness', value: 85 },
                reward: { xp: 150, type: 'instant' },
                category: 'daily'
            },
            {
                id: 'no_insult_week',
                name: 'Une Semaine Sans Insulte',
                description: 'Ne pas utiliser d\'insulte pendant une semaine',
                duration: 604800,
                reward: { xp: 1000, type: 'weekly' },
                category: 'weekly'
            },
            {
                id: 'twenty_reformulations',
                name: 'Vingt Reformulations',
                description: 'Réussir 20 reformulations dans la semaine',
                requirement: { type: 'reformulations', value: 20 },
                reward: { xp: 300, type: 'weekly' },
                category: 'weekly'
            },
            {
                id: 'politeness_90_week',
                name: 'Score de Politesse 90 Hebdo',
                description: 'Maintenir un score de politesse de 90 pendant une semaine',
                requirement: { type: 'politeness', value: 90 },
                reward: { xp: 500, type: 'weekly' },
                category: 'weekly'
            },
            {
                id: 'no_insult_month',
                name: 'Un Mois Sans Insulte',
                description: 'Ne pas utiliser d\'insulte pendant un mois',
                duration: 2592000,
                reward: { xp: 5000, type: 'monthly' },
                category: 'monthly'
            },
            {
                id: 'hundred_reformulations',
                name: 'Cent Reformulations',
                description: 'Réussir 100 reformulations dans le mois',
                requirement: { type: 'reformulations', value: 100 },
                reward: { xp: 1000, type: 'monthly' },
                category: 'monthly'
            },
            {
                id: 'level_up',
                name: 'Monter de Niveau',
                description: 'Gagner un niveau',
                requirement: { type: 'level', value: 1 },
                reward: { xp: 50, type: 'instant' },
                category: 'daily'
            },
            {
                id: 'three_challenges',
                name: 'Trois Défis',
                description: 'Compléter 3 défis dans la journée',
                requirement: { type: 'challenges', value: 3 },
                reward: { xp: 200, type: 'daily' },
                category: 'daily'
            },
            {
                id: 'perfect_day',
                name: 'Journée Parfaite',
                description: 'Avoir un score de politesse de 100 toute la journée',
                requirement: { type: 'politeness', value: 100 },
                reward: { xp: 300, type: 'daily' },
                category: 'daily'
            }
        ];
    }
    
    checkBadges() {
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        const unlockedBadges = storage.getAchievements();
        
        this.badges.forEach(badge => {
            if (unlockedBadges.find(b => b.id === badge.id)) {
                return;
            }
            
            let unlocked = false;
            
            switch (badge.requirement.type) {
                case 'reformulations':
                    unlocked = stats.totalReformulations >= badge.requirement.value;
                    break;
                case 'streak':
                    unlocked = stats.currentStreak >= badge.requirement.value;
                    break;
                case 'politeness':
                    unlocked = stats.politenessScore >= badge.requirement.value;
                    break;
                case 'level':
                    unlocked = progress.level >= badge.requirement.value;
                    break;
                case 'challenges':
                    unlocked = progress.completedChallenges.length >= badge.requirement.value;
                    break;
                case 'special':
                    unlocked = this.checkSpecialBadge(badge.requirement.value);
                    break;
                case 'social':
                    unlocked = this.checkSocialBadge(badge.requirement.value);
                    break;
                case 'vocabulary':
                    unlocked = this.checkVocabularyBadge(badge.requirement.value);
                    break;
            }
            
            if (unlocked) {
                this.unlockBadge(badge);
            }
        });
    }
    
    checkSpecialBadge(type) {
        const now = new Date();
        
        switch (type) {
            case 'early_bird':
                return now.getHours() < 8;
            case 'night_owl':
                return now.getHours() >= 22;
            case 'dedicated':
                const history = storage.getHistory();
                const dates = new Set();
                history.forEach(item => {
                    dates.add(new Date(item.timestamp).toDateString());
                });
                return dates.size >= 7;
            case 'perfectionist':
                const dailyData = statisticsManager.getDailyData(3);
                return dailyData.every(d => d.politenessScore === 100);
            case 'quick_learner':
                const recentReformulations = storage.getReformulations().filter(r => {
                    const diff = now - new Date(r.timestamp);
                    return diff < 3600000;
                });
                return recentReformulations.length >= 5;
            case 'patience_master':
                return statisticsManager.getStats().timeWithoutInsult >= 600;
            default:
                return false;
        }
    }
    
    checkSocialBadge(value) {
        const progress = storage.getUserProgress();
        return progress.sharedProgress || 0 >= value;
    }
    
    checkVocabularyBadge(value) {
        const reformulations = storage.getReformulations();
        const uniqueReformulations = new Set(reformulations.map(r => r.reformulation));
        return uniqueReformulations.size >= value;
    }
    
    unlockBadge(badge) {
        storage.addAchievement(badge);
        storage.addXP(badge.xpReward);
        
        notifications.show({
            type: 'success',
            title: 'Badge Débloqué !',
            message: `Tu as obtenu le badge "${badge.name}"`,
            duration: 5000
        });
        
        storage.addHistoryItem({
            type: 'achievement',
            content: `Badge débloqué : ${badge.name}`
        });
    }
    
    getBadges() {
        const unlockedBadges = storage.getAchievements();
        return this.badges.map(badge => ({
            ...badge,
            unlocked: unlockedBadges.find(b => b.id === badge.id) !== undefined
        }));
    }
    
    getBadgesByCategory(category) {
        return this.getBadges().filter(badge => badge.category === category);
    }
    
    getUnlockedBadges() {
        return this.getBadges().filter(badge => badge.unlocked);
    }
    
    getLockedBadges() {
        return this.getBadges().filter(badge => !badge.unlocked);
    }
    
    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return false;
        
        const activeChallenge = {
            ...challenge,
            startTime: new Date().toISOString(),
            progress: 0,
            completed: false
        };
        
        this.completedChallenges.push(activeChallenge);
        storage.saveChallenges(this.completedChallenges);
        
        notifications.show({
            type: 'info',
            title: 'Défi Commencé',
            message: `Tu as commencé le défi "${challenge.name}"`,
            duration: 3000
        });
        
        return true;
    }
    
    updateChallengeProgress(challengeId, progress) {
        const challengeIndex = this.completedChallenges.findIndex(
            c => c.id === challengeId && !c.completed
        );
        
        if (challengeIndex === -1) return false;
        
        this.completedChallenges[challengeIndex].progress = progress;
        storage.saveChallenges(this.completedChallenges);
        
        return true;
    }
    
    completeChallenge(challengeId) {
        const challengeIndex = this.completedChallenges.findIndex(
            c => c.id === challengeId && !c.completed
        );
        
        if (challengeIndex === -1) return false;
        
        const challenge = this.completedChallenges[challengeIndex];
        challenge.completed = true;
        challenge.completedAt = new Date().toISOString();
        
        storage.saveChallenges(this.completedChallenges);
        storage.addXP(challenge.reward.xp);
        
        const progress = storage.getUserProgress();
        progress.completedChallenges.push(challengeId);
        storage.saveUserProgress(progress);
        
        notifications.show({
            type: 'success',
            title: 'Défi Complété !',
            message: `Tu as complété le défi "${challenge.name}" (+${challenge.reward.xp} XP)`,
            duration: 5000
        });
        
        storage.addHistoryItem({
            type: 'challenge',
            content: `Défi complété : ${challenge.name}`
        });
        
        this.checkBadges();
        
        return true;
    }
    
    getChallenges() {
        return this.challenges;
    }
    
    getActiveChallenges() {
        return this.completedChallenges.filter(c => !c.completed);
    }
    
    getCompletedChallenges() {
        return this.completedChallenges.filter(c => c.completed);
    }
    
    getAvailableChallenges() {
        const activeIds = this.getActiveChallenges().map(c => c.id);
        return this.challenges.filter(c => !activeIds.includes(c.id));
    }
    
    getChallengesByCategory(category) {
        return this.challenges.filter(challenge => challenge.category === category);
    }
    
    checkChallenges() {
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        
        this.getActiveChallenges().forEach(challenge => {
            let completed = false;
            let progressValue = 0;
            
            if (challenge.duration) {
                const elapsed = (new Date() - new Date(challenge.startTime)) / 1000;
                progressValue = Math.min(100, (elapsed / challenge.duration) * 100);
                completed = elapsed >= challenge.duration;
            } else if (challenge.requirement) {
                switch (challenge.requirement.type) {
                    case 'reformulations':
                        progressValue = Math.min(100, (stats.totalReformulations / challenge.requirement.value) * 100);
                        completed = stats.totalReformulations >= challenge.requirement.value;
                        break;
                    case 'politeness':
                        progressValue = Math.min(100, (stats.politenessScore / challenge.requirement.value) * 100);
                        completed = stats.politenessScore >= challenge.requirement.value;
                        break;
                    case 'level':
                        progressValue = Math.min(100, (progress.level / challenge.requirement.value) * 100);
                        completed = progress.level >= challenge.requirement.value;
                        break;
                    case 'challenges':
                        progressValue = Math.min(100, (progress.completedChallenges.length / challenge.requirement.value) * 100);
                        completed = progress.completedChallenges.length >= challenge.requirement.value;
                        break;
                }
            }
            
            this.updateChallengeProgress(challenge.id, progressValue);
            
            if (completed) {
                this.completeChallenge(challenge.id);
            }
        });
    }
    
    generateDailyChallenge() {
        const dailyChallenges = this.getChallengesByCategory('daily');
        const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
        
        return randomChallenge;
    }
    
    generateWeeklyChallenge() {
        const weeklyChallenges = this.getChallengesByCategory('weekly');
        const randomChallenge = weeklyChallenges[Math.floor(Math.random() * weeklyChallenges.length)];
        
        return randomChallenge;
    }
    
    generateMonthlyChallenge() {
        const monthlyChallenges = this.getChallengesByCategory('monthly');
        const randomChallenge = monthlyChallenges[Math.floor(Math.random() * monthlyChallenges.length)];
        
        return randomChallenge;
    }
    
    getProgressTowardsBadge(badgeId) {
        const badge = this.badges.find(b => b.id === badgeId);
        if (!badge) return 0;
        
        const stats = storage.getStatistics();
        const progress = storage.getUserProgress();
        
        let current = 0;
        let required = badge.requirement.value;
        
        switch (badge.requirement.type) {
            case 'reformulations':
                current = stats.totalReformulations;
                break;
            case 'streak':
                current = stats.currentStreak;
                break;
            case 'politeness':
                current = stats.politenessScore;
                break;
            case 'level':
                current = progress.level;
                break;
            case 'challenges':
                current = progress.completedChallenges.length;
                break;
            default:
                current = 0;
        }
        
        return Math.min(100, (current / required) * 100);
    }
}

const achievementsManager = new AchievementsManager();

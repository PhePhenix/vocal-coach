class StatisticsManager {
    constructor() {
        this.stats = storage.getStatistics();
        this.charts = {};
    }
    
    getStats() {
        return this.stats;
    }
    
    updateStats(updates) {
        this.stats = { ...this.stats, ...updates };
        storage.saveStatistics(this.stats);
    }
    
    calculatePolitenessScore() {
        const baseScore = 100;
        const insultPenalty = 5;
        const reformulationBonus = 2;
        const streakBonus = 1;
        
        let score = baseScore;
        score -= this.stats.insultsToday * insultPenalty;
        score += this.stats.totalReformulations * reformulationBonus;
        score += this.stats.currentStreak * streakBonus;
        
        score = Math.max(0, Math.min(100, score));
        
        this.stats.politenessScore = Math.round(score);
        storage.saveStatistics(this.stats);
        
        return this.stats.politenessScore;
    }
    
    calculateTimeWithoutInsult() {
        if (!this.stats.lastInsultDate) {
            const sessionStart = storage.getSession()?.sessionStart;
            if (sessionStart) {
                const diff = new Date() - new Date(sessionStart);
                this.stats.timeWithoutInsult = Math.floor(diff / 1000);
            }
        } else {
            const diff = new Date() - new Date(this.stats.lastInsultDate);
            this.stats.timeWithoutInsult = Math.floor(diff / 1000);
            
            if (this.stats.timeWithoutInsult > this.stats.recordTimeWithoutInsult) {
                this.stats.recordTimeWithoutInsult = this.stats.timeWithoutInsult;
            }
        }
        
        storage.saveStatistics(this.stats);
        return this.stats.timeWithoutInsult;
    }
    
    updateStreak() {
        const today = new Date().toDateString();
        const lastInsult = this.stats.lastInsultDate ? new Date(this.stats.lastInsultDate).toDateString() : null;
        
        if (lastInsult !== today && this.stats.insultsToday === 0) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastInsult === yesterday.toDateString()) {
                this.stats.currentStreak++;
            } else if (lastInsult !== today) {
                this.stats.currentStreak = 1;
            }
            
            if (this.stats.currentStreak > this.stats.longestStreak) {
                this.stats.longestStreak = this.stats.currentStreak;
            }
        }
        
        storage.saveStatistics(this.stats);
        return this.stats.currentStreak;
    }
    
    recordDailyData() {
        const today = new Date().toDateString();
        const dailyData = this.stats.dailyData || {};
        
        if (!dailyData[today]) {
            dailyData[today] = {
                insults: 0,
                reformulations: 0,
                politenessScore: 100
            };
        }
        
        dailyData[today].insults = this.stats.insultsToday;
        dailyData[today].reformulations = this.stats.reformulationsToday;
        dailyData[today].politenessScore = this.calculatePolitenessScore();
        
        this.stats.dailyData = dailyData;
        storage.saveStatistics(this.stats);
    }
    
    recordWeeklyData() {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekKey = weekStart.toDateString();
        
        const weeklyData = this.stats.weeklyData || {};
        
        if (!weeklyData[weekKey]) {
            weeklyData[weekKey] = {
                insults: 0,
                reformulations: 0,
                politenessScore: 100
            };
        }
        
        weeklyData[weekKey].insults = this.stats.insultsThisWeek;
        weeklyData[weekKey].reformulations = this.stats.totalReformulations;
        weeklyData[weekKey].politenessScore = this.calculatePolitenessScore();
        
        this.stats.weeklyData = weeklyData;
        storage.saveStatistics(this.stats);
    }
    
    recordMonthlyData() {
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
        
        const monthlyData = this.stats.monthlyData || {};
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                insults: 0,
                reformulations: 0,
                politenessScore: 100
            };
        }
        
        monthlyData[monthKey].insults = this.stats.insultsThisMonth;
        monthlyData[monthKey].reformulations = this.stats.totalReformulations;
        monthlyData[monthKey].politenessScore = this.calculatePolitenessScore();
        
        this.stats.monthlyData = monthlyData;
        storage.saveStatistics(this.stats);
    }
    
    recordHourlyData() {
        const now = new Date();
        const hourKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
        
        const hourlyData = this.stats.hourlyData || {};
        
        if (!hourlyData[hourKey]) {
            hourlyData[hourKey] = {
                insults: 0
            };
        }
        
        hourlyData[hourKey].insults++;
        
        this.stats.hourlyData = hourlyData;
        storage.saveStatistics(this.stats);
    }
    
    getDailyData(days = 7) {
        const data = [];
        const dailyData = this.stats.dailyData || {};
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateKey = date.toDateString();
            
            data.push({
                date: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
                insults: dailyData[dateKey]?.insults || 0,
                reformulations: dailyData[dateKey]?.reformulations || 0,
                politenessScore: dailyData[dateKey]?.politenessScore || 100
            });
        }
        
        return data;
    }
    
    getWeeklyData(weeks = 4) {
        const data = [];
        const weeklyData = this.stats.weeklyData || {};
        
        for (let i = weeks - 1; i >= 0; i--) {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - (weekStart.getDay() + (i * 7)));
            const weekKey = weekStart.toDateString();
            
            data.push({
                week: `Semaine ${weeks - i}`,
                insults: weeklyData[weekKey]?.insults || 0,
                reformulations: weeklyData[weekKey]?.reformulations || 0,
                politenessScore: weeklyData[weekKey]?.politenessScore || 100
            });
        }
        
        return data;
    }
    
    getMonthlyData(months = 6) {
        const data = [];
        const monthlyData = this.stats.monthlyData || {};
        
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            
            data.push({
                month: date.toLocaleDateString('fr-FR', { month: 'short' }),
                insults: monthlyData[monthKey]?.insults || 0,
                reformulations: monthlyData[monthKey]?.reformulations || 0,
                politenessScore: monthlyData[monthKey]?.politenessScore || 100
            });
        }
        
        return data;
    }
    
    getHourlyData() {
        const data = [];
        const hourlyData = this.stats.hourlyData || {};
        
        for (let i = 0; i < 24; i++) {
            const now = new Date();
            const hourKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${i}`;
            
            data.push({
                hour: `${i}h`,
                insults: hourlyData[hourKey]?.insults || 0
            });
        }
        
        return data;
    }
    
    getInsultDistribution() {
        const insults = storage.getInsults();
        const distribution = {};
        
        insults.forEach(insult => {
            const normalized = insultDetector.normalizeText(insult.insult);
            distribution[normalized] = (distribution[normalized] || 0) + 1;
        });
        
        return Object.entries(distribution)
            .map(([insult, count]) => ({ insult, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }
    
    getInsultTypeDistribution() {
        const insults = storage.getInsults();
        const distribution = {
            french: 0,
            english: 0,
            custom: 0,
            unknown: 0
        };
        
        insults.forEach(insult => {
            const type = insultDetector.getInsultType(insult.insult);
            distribution[type] = (distribution[type] || 0) + 1;
        });
        
        return distribution;
    }
    
    getProgression(period = 'day') {
        switch (period) {
            case 'day':
                return this.getDailyData();
            case 'week':
                return this.getWeeklyData();
            case 'month':
                return this.getMonthlyData();
            case 'year':
                return this.getMonthlyData(12);
            default:
                return this.getDailyData();
        }
    }
    
    getComparison(period = 'day') {
        const currentData = this.getProgression(period);
        const previousData = this.getProgression(period).slice(1);
        
        if (currentData.length === 0 || previousData.length === 0) {
            return {
                insultsChange: 0,
                reformulationsChange: 0,
                politenessChange: 0
            };
        }
        
        const currentInsults = currentData.reduce((sum, d) => sum + d.insults, 0);
        const previousInsults = previousData.reduce((sum, d) => sum + d.insults, 0);
        
        const currentReformulations = currentData.reduce((sum, d) => sum + d.reformulations, 0);
        const previousReformulations = previousData.reduce((sum, d) => sum + d.reformulations, 0);
        
        const currentPoliteness = currentData.reduce((sum, d) => sum + d.politenessScore, 0) / currentData.length;
        const previousPoliteness = previousData.reduce((sum, d) => sum + d.politenessScore, 0) / previousData.length;
        
        return {
            insultsChange: currentInsults - previousInsults,
            reformulationsChange: currentReformulations - previousReformulations,
            politenessChange: currentPoliteness - previousPoliteness
        };
    }
    
    getSummary() {
        return {
            politenessScore: this.calculatePolitenessScore(),
            insultsToday: this.stats.insultsToday,
            totalInsults: this.stats.totalInsults,
            currentStreak: this.stats.currentStreak,
            longestStreak: this.stats.longestStreak,
            timeWithoutInsult: this.calculateTimeWithoutInsult(),
            recordTimeWithoutInsult: this.stats.recordTimeWithoutInsult,
            totalReformulations: this.stats.totalReformulations,
            reformulationsToday: this.stats.reformulationsToday
        };
    }
    
    resetDaily() {
        this.stats.insultsToday = 0;
        this.stats.reformulationsToday = 0;
        this.calculatePolitenessScore();
        storage.saveStatistics(this.stats);
    }
    
    resetWeekly() {
        this.stats.insultsThisWeek = 0;
        storage.saveStatistics(this.stats);
    }
    
    resetMonthly() {
        this.stats.insultsThisMonth = 0;
        storage.saveStatistics(this.stats);
    }
    
    resetAll() {
        this.stats = {
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
        storage.saveStatistics(this.stats);
    }
    
    exportStatistics() {
        return {
            summary: this.getSummary(),
            dailyData: this.getDailyData(30),
            weeklyData: this.getWeeklyData(12),
            monthlyData: this.getMonthlyData(12),
            hourlyData: this.getHourlyData(),
            insultDistribution: this.getInsultDistribution(),
            insultTypeDistribution: this.getInsultTypeDistribution(),
            exportDate: new Date().toISOString()
        };
    }
}

const statisticsManager = new StatisticsManager();

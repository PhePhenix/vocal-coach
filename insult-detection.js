class InsultDetector {
    constructor() {
        this.frenchInsults = [
            'putain', 'pute', 'put', 'connard', 'con', 'conne', 'cons', 'salope', 'salop', 'salo',
            'enculé', 'encule', 'enculer', 'bordel', 'bordel', 'merde', 'merd', 'chier', 'chie',
            'fils de pute', 'fdp', 'ta gueule', 'tg', 'nique', 'niquer', 'niak', 'niaké',
            'couillon', 'couill', 'batard', 'batard', 'enfoiré', 'enfoire', 'enfoirés',
            'trou du cul', 'tdc', 'enculer', 'enculé', 'enculés', 'salaud', 'salauds',
            'connasse', 'connasses', 'conasse', 'imbécile', 'imbéciles', 'imbécil',
            'idiot', 'idiote', 'idiots', 'idiotes', 'stupide', 'stupides', 'crétin',
            'crétine', 'crétins', 'crétines', 'abrut', 'abruti', 'abrutis', 'abruties',
            'débile', 'débiles', 'mongol', 'mongole', 'mongols', 'mongoles', 'taré',
            'tarée', 'tarés', 'tarées', 'fou', 'folle', 'fous', 'folles', 'malade',
            'malades', 'pédé', 'pede', 'pédés', 'pedes', 'tapette', 'tapettes',
            'folle', 'enculé', 'enculer', 'putain', 'pute', 'connard', 'con', 'salope',
            'bordel', 'merde', 'chier', 'fils de pute', 'ta gueule', 'nique', 'couillon',
            'batard', 'enfoiré', 'trou du cul', 'salaud', 'connasse', 'imbécile', 'idiot',
            'stupide', 'crétin', 'abruti', 'débile', 'mongol', 'taré', 'fou', 'malade',
            'pédé', 'tapette', 'folle', 'gringue', 'gringues', 'bouffon', 'bouffons',
            'bouffonne', 'bouffonnes', 'andouille', 'andouilles', 'andouiller', 'baltringue',
            'baltringues', 'bête', 'bêtes', 'bêtise', 'bêtises', 'bête comme ses pieds',
            'bon à rien', 'bons à rien', 'branleur', 'branleurs', 'branleuse', 'branleuses',
            'casse-couilles', 'casse-cou', 'chiant', 'chiante', 'chiants', 'chiantes',
            'con comme la lune', 'con comme une valise', 'corniaud', 'corniauds', 'couillon',
            'couillons', 'couillonne', 'couillonnes', 'crétin', 'crétins', 'crétine',
            'crétines', 'débile', 'débiles', 'dégénéré', 'dégénérés', 'dégénérée',
            'dégénérées', 'dégueulasse', 'dégueulasses', 'empoté', 'empotée', 'empotés',
            'empotées', 'enflure', 'enflures', 'épave', 'épaves', 'fauché', 'fauchée',
            'fauchés', 'fauchées', 'fifre', 'fifres', 'flippé', 'flippée', 'flippés',
            'flippées', 'fou', 'foufou', 'folle', 'folles', 'fous', 'frelon', 'frelons',
            'frigide', 'frigides', 'goujat', 'goujats', 'goujate', 'goujates', 'graille',
            'grailles', 'grognasse', 'grognasses', 'gueule', 'gueules', 'hurluberlu',
            'hurluberlus', 'hurluberlue', 'hurluberlues', 'idiot', 'idiote', 'idiots',
            'idiotes', 'ignare', 'ignares', 'imbécile', 'imbéciles', 'incompétent',
            'incompétente', 'incompétents', 'incompétentes', 'inculte', 'incultes',
            'inutile', 'inutiles', 'lâche', 'lâches', 'lâcheur', 'lâcheurs', 'lâcheuse',
            'lâcheuses', 'looser', 'loosers', 'loser', 'losers', 'loubard', 'loubards',
            'manche', 'manches', 'merde', 'merdes', 'merdique', 'merdiques', 'minable',
            'minables', 'miteux', 'miteuse', 'miteux', 'miteuses', 'moc', 'mocs', 'mocque',
            'mocques', 'mollasson', 'mollassons', 'mollassonne', 'mollassonnes', 'monstre',
            'monstres', 'mou', 'moue', 'mous', 'moues', 'naze', 'nazes', 'nul', 'nulle',
            'nuls', 'nulles', 'ordure', 'ordures', 'pignouf', 'pignoufs', 'pisse-froid',
            'pisse-froids', 'plouc', 'ploucs', 'pochard', 'pochards', 'pocharde',
            'pochardes', 'pouffiasse', 'pouffiasses', 'pourri', 'pourrie', 'pourris',
            'pourries', 'prétentieux', 'prétentieuse', 'prétentieux', 'prétentieuses',
            'raté', 'ratée', 'ratés', 'ratées', 'ringard', 'ringards', 'ringarde',
            'ringardes', 'sac à merde', 'sacs à merde', 'salaud', 'salauds', 'sans-dessein',
            'sans-desseins', 'sanguinaire', 'sanguinaires', 'satané', 'satanée', 'satanés',
            'satanées', 'sauvage', 'sauvages', 'sombre', 'sombres', 'sot', 'sotte', 'sots',
            'sottes', 'stupide', 'stupides', 'tache', 'taches', 'taré', 'tarée', 'tarés',
            'tarées', 'tête de linotte', 'têtes de linotte', 'tête de mule', 'têtes de mule',
            'tête de noeud', 'têtes de noeud', 'tocard', 'tocards', 'tocarde', 'tocardes',
            'tordu', 'tordue', 'tordus', 'tordues', 'traînée', 'traînées', 'traînard',
            'traînards', 'traînarde', 'traînardes', 'trou du cul', 'trous du cul', 'truand',
            'truands', 'truande', 'truandes', 'tête de mort', 'têtes de mort', 'vaurien',
            'vauriens', 'veule', 'veules', 'vidange', 'vidanges', 'zob', 'zobs'
        ];
        
        this.englishInsults = [
            'fuck', 'fucking', 'fucked', 'fucker', 'shit', 'shitty', 'shitting', 'damn',
            'damned', 'ass', 'asshole', 'bitch', 'bastard', 'crap', 'suck', 'sucks',
            'sucker', 'dick', 'dickhead', 'cock', 'pussy', 'cunt', 'whore', 'slut',
            'douche', 'douchebag', 'twat', 'wanker', 'wank', 'prick', 'dumbass',
            'dumbfuck', 'dumbshit', 'retard', 'retarded', 'idiot', 'stupid', 'moron',
            'imbecile', 'jackass', 'jackoff', 'jerk', 'jerkoff', 'loser', 'lowlife',
            'scumbag', 'scum', 'piece of shit', 'son of a bitch', 'motherfucker',
            'motherfucking', 'bullshit', 'horseshit', 'chickenshit', 'dogshit',
            'crap', 'crappy', 'crapping', 'asshole', 'arsehole', 'arse', 'bugger',
            'bloody', 'hell', 'piss', 'pissed', 'pissing', 'piss off', 'pissed off',
            'screw', 'screwed', 'screwing', 'screw you', 'screw this', 'screw that',
            'fag', 'faggot', 'fagot', 'gay', 'homo', 'homosexual', 'lesbian',
            'dyke', 'tranny', 'shemale', 'nigger', 'nigga', 'nigguh', 'negro',
            'chink', 'gook', 'spic', 'spick', 'wetback', 'kike', 'kyke', 'hebe',
            'heeb', 'jap', 'japs', 'paki', 'pakis', 'towelhead', 'towel head',
            'raghead', 'rag head', 'sand nigger', 'sand nigger', 'camel jockey',
            'towelhead', 'towel head', 'coon', 'coon', 'jigaboo', 'jigaboo', 'spade',
            'spade', 'mulatto', 'mulatto', 'half-breed', 'half breed', 'mongrel',
            'mongrel', 'mutt', 'mutt', 'cur', 'cur', 'bitch', 'bitch', 'son of a bitch',
            'son of a bitch', 'motherfucker', 'motherfucker', 'bastard', 'bastard',
            'whore', 'whore', 'slut', 'slut', 'prostitute', 'prostitute', 'hooker',
            'hooker', 'tramp', 'tramp', 'skank', 'skank', 'ho', 'ho', 'hoe', 'hoe',
            'cunt', 'cunt', 'twat', 'twat', 'pussy', 'pussy', 'snatch', 'snatch',
            'beaver', 'beaver', 'clam', 'clam', 'cock', 'cock', 'dick', 'dick',
            'prick', 'prick', 'wang', 'wang', 'wiener', 'wiener', 'weenie', 'weenie',
            'pecker', 'pecker', 'schlong', 'schlong', 'dong', 'dong', 'rod', 'rod',
            'shaft', 'shaft', 'boner', 'boner', 'hard-on', 'hard-on', 'woody', 'woody',
            'ass', 'ass', 'arse', 'arse', 'bum', 'bum', 'butt', 'butt', 'buttocks',
            'buttocks', 'rear', 'rear', 'rear end', 'rear end', 'behind', 'behind',
            'derriere', 'derriere', 'tush', 'tush', 'tushy', 'tushy', 'rump', 'rump',
            'fanny', 'fanny', 'booty', 'booty', 'asshole', 'asshole', 'arsehole',
            'arsehole', 'shit', 'shit', 'crap', 'crap', 'poop', 'poop', 'turd', 'turd',
            'feces', 'feces', 'dung', 'dung', 'excrement', 'excrement', 'bullshit',
            'bullshit', 'horseshit', 'horseshit', 'dogshit', 'dogshit', 'chickenshit',
            'chickenshit', 'bull', 'bull', 'crap', 'crap', 'garbage', 'garbage',
            'trash', 'trash', 'rubbish', 'rubbish', 'junk', 'junk', 'dirt', 'dirt',
            'filth', 'filth', 'scum', 'scum', 'slime', 'slime', 'muck', 'muck',
            'mire', 'mire', 'dreck', 'dreck', 'dross', 'dross', 'refuse', 'refuse',
            'waste', 'waste', 'rubbish', 'rubbish', 'crap', 'crap', 'shit', 'shit',
            'damn', 'damn', 'damned', 'damned', 'hell', 'hell', 'fuck', 'fuck',
            'fucking', 'fucking', 'fucked', 'fucked', 'fucker', 'fucker', 'screw',
            'screw', 'screwed', 'screwed', 'screwing', 'screwing', 'screw you',
            'screw you', 'screw this', 'screw this', 'screw that', 'screw that',
            'piss', 'piss', 'pissed', 'pissed', 'pissing', 'pissing', 'piss off',
            'piss off', 'pissed off', 'pissed off', 'crap', 'crap', 'crappy', 'crappy',
            'crapping', 'crapping', 'suck', 'suck', 'sucks', 'sucks', 'sucking',
            'sucking', 'sucker', 'sucker', 'blow', 'blow', 'blows', 'blows', 'blowing',
            'blowing', 'blowjob', 'blowjob', 'blow job', 'blow job', 'handjob',
            'handjob', 'hand job', 'hand job', 'dick', 'dick', 'dickhead', 'dickhead',
            'cock', 'cock', 'cockhead', 'cockhead', 'prick', 'prick', 'prickhead',
            'prickhead', 'ass', 'ass', 'asshole', 'asshole', 'arse', 'arse', 'arsehole',
            'arsehole', 'butt', 'butt', 'butthead', 'butthead', 'shithead', 'shithead',
            'shit for brains', 'shit for brains', 'dumbass', 'dumbass', 'dumbfuck',
            'dumbfuck', 'dumbshit', 'dumbshit', 'dipshit', 'dipshit', 'dipstick',
            'dipstick', 'doofus', 'doofus', 'dork', 'dork', 'dweeb', 'dweeb', 'geek',
            'geek', 'nerd', 'nerd', 'loser', 'loser', 'lowlife', 'lowlife', 'scumbag',
            'scumbag', 'scum', 'scum', 'waste of space', 'waste of space', 'waste of air',
            'waste of air', 'oxygen thief', 'oxygen thief', 'useless', 'useless',
            'worthless', 'worthless', 'pointless', 'pointless', 'hopeless', 'hopeless',
            'pathetic', 'pathetic', 'pitiful', 'pitiful', 'sad', 'sad', 'sorry',
            'sorry', 'lame', 'lame', 'weak', 'weak', 'stupid', 'stupid', 'dumb', 'dumb',
            'idiotic', 'idiotic', 'moronic', 'moronic', 'retarded', 'retarded', 'braindead',
            'braindead', 'brain-dead', 'brain-dead', 'mindless', 'mindless', 'senseless',
            'senseless', 'thoughtless', 'thoughtless', 'clueless', 'clueless', 'ignorant',
            'ignorant', 'uneducated', 'uneducated', 'illiterate', 'illiterate', 'uninformed',
            'uninformed', 'misinformed', 'misinformed', 'confused', 'confused', 'delusional',
            'delusional', 'crazy', 'crazy', 'insane', 'insane', 'mad', 'mad', 'mental',
            'mental', 'psycho', 'psycho', 'psychotic', 'psychotic', 'sick', 'sick',
            'twisted', 'twisted', 'warped', 'warped', 'perverted', 'perverted', 'sicko',
            'sicko', 'freak', 'freak', 'weirdo', 'weirdo', 'creep', 'creep', 'creepy',
            'creepy', 'scary', 'scary', 'frightening', 'frightening', 'terrifying',
            'terrifying', 'horrible', 'horrible', 'terrible', 'terrible', 'awful', 'awful',
            'disgusting', 'disgusting', 'gross', 'gross', 'nasty', 'nasty', 'vile',
            'vile', 'repulsive', 'repulsive', 'repugnant', 'repugnant', 'abhorrent',
            'abhorrent', 'detestable', 'detestable', 'loathsome', 'loathsome', 'hateful',
            'hateful', 'hate', 'hate', 'hating', 'hating', 'hated', 'hated', 'hatred',
            'hatred', 'hostile', 'hostile', 'aggressive', 'aggressive', 'violent',
            'violent', 'abusive', 'abusive', 'cruel', 'cruel', 'mean', 'mean', 'nasty',
            'nasty', 'evil', 'evil', 'wicked', 'wicked', 'sinful', 'sinful', 'immoral',
            'immoral', 'unethical', 'unethical', 'wrong', 'wrong', 'bad', 'bad', 'terrible',
            'terrible', 'horrible', 'horrible', 'awful', 'awful', 'dreadful', 'dreadful'
        ];
        
        this.variations = {
            'putain': ['put', 'put1', 'putainn', 'putainnn', 'pute', 'ptn', 'ptn'],
            'con': ['conn', 'connard', 'conne', 'cons', 'conss', 'c0n', 'c0nn'],
            'merde': ['merd', 'merde', 'm3rde', 'merdee', 'merdes', 'mrd'],
            'fuck': ['fck', 'fuk', 'fucc', 'fuccck', 'fucking', 'fucked', 'fcker'],
            'bitch': ['bich', 'btch', 'biatch', 'bitchh', 'bitchhh'],
            'shit': ['sh1t', 'shitt', 'shittt', 'shitty', 'shiting'],
            'ass': ['a$$', 'azz', 'as$', 'a55', 'arse', 'ars'],
            'damn': ['dam', 'damnn', 'dammmm', 'damm'],
            'salaud': ['slaud', 'salaud', 'salod', 'salau'],
            'connard': ['conard', 'conardd', 'conarrd', 'c0nard'],
            'enculé': ['encule', 'enculer', 'enculée', 'enculés', 'enculee'],
            'bordel': ['bordell', 'bordelll', 'b0rdel', 'brdl'],
            'chier': ['chie', 'chier', 'chies', 'chier'],
            'fils de pute': ['fdp', 'fils de pute', 'fils dpute', 'fils d pute'],
            'ta gueule': ['tg', 'ta gueule', 'ta geule', 'ferme ta gueule'],
            'nique': ['niak', 'niaké', 'niakke', 'niquer', 'niqu'],
            'couillon': ['couill', 'couillon', 'couillons', 'couillonn'],
            'batard': ['batard', 'batar', 'bastard', 'bstrd'],
            'enfoiré': ['enfoire', 'enfoiré', 'enfoirés', 'enfoirée'],
            'trou du cul': ['tdc', 'trou du cul', 'trou dcul', 'trou du q'],
            'connasse': ['conasse', 'connasse', 'conasse'],
            'imbécile': ['imbecile', 'imbécile', 'imbecil', 'imbecille'],
            'idiot': ['idiot', 'idiote', 'idiots', 'idiot'],
            'stupide': ['stupide', 'stupid', 'stupide'],
            'crétin': ['cretin', 'crétin', 'cretine', 'crétine'],
            'abruti': ['abrut', 'abruti', 'abrutis', 'abrutie'],
            'débile': ['debile', 'débile', 'debiles', 'débiles'],
            'mongol': ['mongol', 'mongole', 'mongols', 'mongoles'],
            'taré': ['tare', 'taré', 'tarée', 'tarés'],
            'fou': ['foo', 'fou', 'folle', 'fous', 'folles'],
            'malade': ['malade', 'malades', 'malade'],
            'pédé': ['pede', 'pédé', 'pedes', 'pédés'],
            'tapette': ['tapette', 'tapettes', 'tapette'],
            'gringue': ['gringue', 'gringues', 'gringu'],
            'bouffon': ['bouffon', 'bouffons', 'bouffonne', 'bouffonnes'],
            'andouille': ['andouille', 'andouilles', 'andouiller'],
            'baltringue': ['baltringue', 'baltringues', 'baltringu'],
            'branleur': ['branleur', 'branleurs', 'branleuse', 'branleuses'],
            'casse-couilles': ['casse-couilles', 'casse couilles', 'casse couille'],
            'chiant': ['chiant', 'chiante', 'chiants', 'chiantes'],
            'corniaud': ['corniaud', 'corniauds', 'corniaud'],
            'dégénéré': ['degenere', 'dégénéré', 'degeneres', 'dégénérés'],
            'dégueulasse': ['degeulasse', 'dégueulasse', 'degeulasses'],
            'empoté': ['empote', 'empoté', 'empotes', 'empotés'],
            'enflure': ['enflure', 'enflures', 'enflur'],
            'épave': ['epave', 'épave', 'epaves', 'épaves'],
            'fauché': ['fauche', 'fauché', 'fauches', 'fauchés'],
            'fifre': ['fifre', 'fifres', 'fifr'],
            'flippé': ['flippe', 'flippé', 'flippes', 'flippés'],
            'frelon': ['frelon', 'frelons', 'frelon'],
            'frigide': ['frigide', 'frigides', 'frigid'],
            'goujat': ['goujat', 'goujats', 'goujate', 'goujates'],
            'graille': ['graille', 'grailles', 'graill'],
            'grognasse': ['grognasse', 'grognasses', 'grognass'],
            'gueule': ['gueule', 'gueules', 'gueul'],
            'hurluberlu': ['hurluberlu', 'hurluberlus', 'hurluberlue'],
            'ignare': ['ignare', 'ignares', 'ignar'],
            'incompétent': ['incompetent', 'incompétent', 'incompetente'],
            'inculte': ['inculte', 'incultes', 'incult'],
            'inutile': ['inutile', 'inutiles', 'inutil'],
            'lâche': ['lache', 'lâche', 'laches', 'lâches'],
            'lâcheur': ['lacheur', 'lâcheur', 'lacheurs', 'lâcheurs'],
            'looser': ['looser', 'loosers', 'loser', 'losers'],
            'loubard': ['loubard', 'loubards', 'loubard'],
            'manche': ['manche', 'manches', 'manch'],
            'merdique': ['merdique', 'merdiques', 'merdiqu'],
            'minable': ['minable', 'minables', 'minabl'],
            'miteux': ['miteux', 'miteuse', 'miteux', 'miteuses'],
            'moc': ['moc', 'mocs', 'mocque', 'mocques'],
            'mollasson': ['mollasson', 'mollassons', 'mollassonne'],
            'monstre': ['monstre', 'monstres', 'monstr'],
            'mou': ['mou', 'moue', 'mous', 'moues'],
            'naze': ['naze', 'nazes', 'naz'],
            'nul': ['nul', 'nulle', 'nuls', 'nulles'],
            'ordure': ['ordure', 'ordures', 'ordur'],
            'pignouf': ['pignouf', 'pignoufs', 'pignou'],
            'pisse-froid': ['pisse-froid', 'pisse froids', 'pisse froid'],
            'plouc': ['plouc', 'ploucs', 'plou'],
            'pochard': ['pochard', 'pochards', 'pocharde'],
            'pouffiasse': ['pouffiasse', 'pouffiasses', 'pouffiass'],
            'pourri': ['pourri', 'pourrie', 'pourris', 'pourries'],
            'prétentieux': ['pretentieux', 'prétentieux', 'pretentieuse'],
            'raté': ['rate', 'raté', 'rates', 'ratés'],
            'ringard': ['ringard', 'ringards', 'ringarde'],
            'sac à merde': ['sac a merde', 'sac à merde', 'sacs a merde'],
            'sans-dessein': ['sans-dessein', 'sans desseins', 'sans desseins'],
            'sanguinaire': ['sanguinaire', 'sanguinaires', 'sanguinair'],
            'satané': ['satané', 'satanée', 'satanés', 'satanées'],
            'sauvage': ['sauvage', 'sauvages', 'sauvag'],
            'sombre': ['sombre', 'sombres', 'sombr'],
            'sot': ['sot', 'sotte', 'sots', 'sottes'],
            'tache': ['tache', 'taches', 'tach'],
            'tocard': ['tocard', 'tocards', 'tocarde'],
            'tordu': ['tordu', 'tordue', 'tordus', 'tordues'],
            'traînée': ['trainee', 'traînée', 'trainees', 'traînées'],
            'traînard': ['trainard', 'traînard', 'trainards', 'traînards'],
            'truand': ['truand', 'truands', 'truande', 'truandes'],
            'vaurien': ['vaurien', 'vauriens', 'vauri'],
            'veule': ['veule', 'veules', 'veul'],
            'vidange': ['vidange', 'vidanges', 'vidang'],
            'zob': ['zob', 'zobs', 'zo']
        };
        
        this.abbreviations = {
            'ptn': 'putain',
            'pt': 'putain',
            'tg': 'ta gueule',
            'tdc': 'trou du cul',
            'fdp': 'fils de pute',
            'ntm': 'nique ta mère',
            'stg': 'saigne ta gueule',
            'gtp': 'gros tas de pute',
            'gtc': 'gros tas de con',
            'bcp': 'bordel de pute',
            'bct': 'bordel de con',
            'jpp': 'je pète sur ta pute',
            'jtm': 'je t\'aime',
            'jtmr': 'je t\'aime ma reine',
            'jtd': 'je t\'adore',
            'jtmc': 'je t\'aime mon cœur',
            'jtmm': 'je t\'aime ma moitié',
            'jtmb': 'je t\'aime mon bébé',
            'jtmf': 'je t\'aime ma femme',
            'jtmh': 'je t\'aime mon homme',
            'jtml': 'je t\'aime ma life',
            'jtms': 'je t\'aime ma sœur',
            'jtmc': 'je t\'aime ma chérie',
            'jtmg': 'je t\'aime ma gueule',
            'jtm': 'je t\'aime',
            'jt': 'je te',
            'jtm': 'je t\'aime',
            'jtm': 'je t\'aime',
            'lol': 'lol',
            'mdr': 'mort de rire',
            'ptdr': 'péter de rire',
            'xptdr': 'explosé de rire',
            'rip': 'rip',
            'tg': 'ta gueule',
            'tg': 'ta gueule',
            'pt': 'putain',
            'ptn': 'putain',
            'put': 'putain',
            'pute': 'putain',
            'con': 'con',
            'conne': 'con',
            'cons': 'con',
            'merde': 'merde',
            'mrd': 'merde',
            'merd': 'merde',
            'bordel': 'bordel',
            'brdl': 'bordel',
            'chier': 'chier',
            'chie': 'chier',
            'enculé': 'enculé',
            'encule': 'enculé',
            'enculer': 'enculé',
            'salaud': 'salaud',
            'slaud': 'salaud',
            'connard': 'connard',
            'conard': 'connard',
            'connasse': 'connasse',
            'conasse': 'connasse',
            'imbécile': 'imbécile',
            'imbecile': 'imbécile',
            'idiot': 'idiot',
            'idiote': 'idiot',
            'stupide': 'stupide',
            'stupid': 'stupide',
            'crétin': 'crétin',
            'cretin': 'crétin',
            'abruti': 'abruti',
            'abrut': 'abruti',
            'débile': 'débile',
            'debile': 'débile',
            'mongol': 'mongol',
            'mongole': 'mongol',
            'taré': 'taré',
            'tare': 'taré',
            'fou': 'fou',
            'folle': 'fou',
            'malade': 'malade',
            'pédé': 'pédé',
            'pede': 'pédé',
            'tapette': 'tapette',
            'gringue': 'gringue',
            'bouffon': 'bouffon',
            'andouille': 'andouille',
            'baltringue': 'baltringue',
            'branleur': 'branleur',
            'casse-couilles': 'casse-couilles',
            'chiant': 'chiant',
            'chiante': 'chiant',
            'corniaud': 'corniaud',
            'dégénéré': 'dégénéré',
            'degenere': 'dégénéré',
            'dégueulasse': 'dégueulasse',
            'degeulasse': 'dégueulasse',
            'empoté': 'empoté',
            'empote': 'empoté',
            'enflure': 'enflure',
            'épave': 'épave',
            'epave': 'épave',
            'fauché': 'fauché',
            'fauche': 'fauché',
            'fifre': 'fifre',
            'flippé': 'flippé',
            'flippe': 'flippé',
            'frelon': 'frelon',
            'frigide': 'frigide',
            'goujat': 'goujat',
            'graille': 'graille',
            'grognasse': 'grognasse',
            'gueule': 'gueule',
            'hurluberlu': 'hurluberlu',
            'ignare': 'ignare',
            'incompétent': 'incompétent',
            'incompetent': 'incompétent',
            'inculte': 'inculte',
            'inutile': 'inutile',
            'lâche': 'lâche',
            'lache': 'lâche',
            'lâcheur': 'lâcheur',
            'lacheur': 'lâcheur',
            'looser': 'looser',
            'loser': 'looser',
            'loubard': 'loubard',
            'manche': 'manche',
            'merdique': 'merdique',
            'minable': 'minable',
            'miteux': 'miteux',
            'moc': 'moc',
            'mollasson': 'mollasson',
            'monstre': 'monstre',
            'mou': 'mou',
            'naze': 'naze',
            'nul': 'nul',
            'ordure': 'ordure',
            'pignouf': 'pignouf',
            'pisse-froid': 'pisse-froid',
            'plouc': 'plouc',
            'pochard': 'pochard',
            'pouffiasse': 'pouffiasse',
            'pourri': 'pourri',
            'prétentieux': 'prétentieux',
            'pretentieux': 'prétentieux',
            'raté': 'raté',
            'rate': 'raté',
            'ringard': 'ringard',
            'sac à merde': 'sac à merde',
            'sans-dessein': 'sans-dessein',
            'sanguinaire': 'sanguinaire',
            'satané': 'satané',
            'sauvage': 'sauvage',
            'sombre': 'sombre',
            'sot': 'sot',
            'tache': 'tache',
            'tocard': 'tocard',
            'tordu': 'tordu',
            'traînée': 'traînée',
            'trainee': 'traînée',
            'traînard': 'traînard',
            'trainard': 'traînard',
            'truand': 'truand',
            'vaurien': 'vaurien',
            'veule': 'veule',
            'vidange': 'vidange',
            'zob': 'zob'
        };
        
        this.customWords = { forbidden: [], allowed: [] };
        this.language = 'fr';
        this.sensitivity = 5;
        this.severity = 'high';
        
        this.loadCustomWords();
    }
    
    loadCustomWords() {
        const customWords = storage.getCustomWords();
        if (customWords) {
            this.customWords = customWords;
        }
    }
    
    setLanguage(language) {
        this.language = language;
    }
    
    setSensitivity(sensitivity) {
        this.sensitivity = sensitivity;
    }
    
    setSeverity(severity) {
        this.severity = severity;
    }
    
    addCustomForbiddenWord(word) {
        if (!this.customWords.forbidden.includes(word.toLowerCase())) {
            this.customWords.forbidden.push(word.toLowerCase());
            storage.saveCustomWords(this.customWords);
        }
    }
    
    addCustomAllowedWord(word) {
        if (!this.customWords.allowed.includes(word.toLowerCase())) {
            this.customWords.allowed.push(word.toLowerCase());
            storage.saveCustomWords(this.customWords);
        }
    }
    
    removeCustomForbiddenWord(word) {
        const index = this.customWords.forbidden.indexOf(word.toLowerCase());
        if (index > -1) {
            this.customWords.forbidden.splice(index, 1);
            storage.saveCustomWords(this.customWords);
        }
    }
    
    removeCustomAllowedWord(word) {
        const index = this.customWords.allowed.indexOf(word.toLowerCase());
        if (index > -1) {
            this.customWords.allowed.splice(index, 1);
            storage.saveCustomWords(this.customWords);
        }
    }
    
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    expandAbbreviations(text) {
        let normalized = this.normalizeText(text);
        const words = normalized.split(' ');
        
        const expanded = words.map(word => {
            if (this.abbreviations[word]) {
                return this.abbreviations[word];
            }
            return word;
        });
        
        return expanded.join(' ');
    }
    
    detectInsult(text) {
        if (!text || typeof text !== 'string') {
            return null;
        }
        
        const normalized = this.normalizeText(text);
        const expanded = this.expandAbbreviations(text);
        
        const insultsToCheck = [];
        
        if (this.language === 'fr' || this.language === 'both') {
            insultsToCheck.push(...this.frenchInsults);
        }
        
        if (this.language === 'en' || this.language === 'both') {
            insultsToCheck.push(...this.englishInsults);
        }
        
        insultsToCheck.push(...this.customWords.forbidden);
        
        let detectedInsult = null;
        let confidence = 0;
        
        for (const insult of insultsToCheck) {
            const insultLower = insult.toLowerCase();
            const insultNormalized = this.normalizeText(insult);
            
            if (this.customWords.allowed.includes(insultNormalized)) {
                continue;
            }
            
            if (normalized.includes(insultNormalized) || expanded.includes(insultLower)) {
                const matchConfidence = this.calculateConfidence(text, insult);
                if (matchConfidence > confidence) {
                    confidence = matchConfidence;
                    detectedInsult = insult;
                }
            }
            
            const variations = this.variations[insultLower] || [];
            for (const variation of variations) {
                const variationNormalized = this.normalizeText(variation);
                if (normalized.includes(variationNormalized) || expanded.includes(variation)) {
                    const matchConfidence = this.calculateConfidence(text, variation);
                    if (matchConfidence > confidence) {
                        confidence = matchConfidence;
                        detectedInsult = insult;
                    }
                }
            }
            
            if (this.detectFuzzyMatch(normalized, insultNormalized)) {
                const matchConfidence = this.calculateConfidence(text, insult);
                if (matchConfidence > confidence) {
                    confidence = matchConfidence;
                    detectedInsult = insult;
                }
            }
        }
        
        if (detectedInsult && confidence >= this.sensitivity * 10) {
            return {
                insult: detectedInsult,
                confidence: confidence,
                originalText: text,
                context: this.extractContext(text, detectedInsult)
            };
        }
        
        return null;
    }
    
    calculateConfidence(text, insult) {
        const normalized = this.normalizeText(text);
        const insultNormalized = this.normalizeText(insult);
        
        if (normalized === insultNormalized) {
            return 100;
        }
        
        if (normalized.includes(' ' + insultNormalized + ' ')) {
            return 90;
        }
        
        if (normalized.startsWith(insultNormalized + ' ')) {
            return 85;
        }
        
        if (normalized.endsWith(' ' + insultNormalized)) {
            return 85;
        }
        
        if (normalized.includes(insultNormalized)) {
            return 70;
        }
        
        const levenshteinDistance = this.calculateLevenshteinDistance(normalized, insultNormalized);
        const maxLength = Math.max(normalized.length, insultNormalized.length);
        const similarity = 1 - (levenshteinDistance / maxLength);
        
        if (similarity > 0.7) {
            return similarity * 60;
        }
        
        return 0;
    }
    
    calculateLevenshteinDistance(a, b) {
        const matrix = [];
        
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[b.length][a.length];
    }
    
    detectFuzzyMatch(text, insult) {
        const distance = this.calculateLevenshteinDistance(text, insult);
        const maxLength = Math.max(text.length, insult.length);
        const similarity = 1 - (distance / maxLength);
        
        return similarity > 0.8;
    }
    
    extractContext(text, insult) {
        const words = text.split(/\s+/);
        const insultIndex = words.findIndex(word => 
            this.normalizeText(word).includes(this.normalizeText(insult))
        );
        
        if (insultIndex === -1) {
            return text;
        }
        
        const contextStart = Math.max(0, insultIndex - 3);
        const contextEnd = Math.min(words.length, insultIndex + 4);
        
        return words.slice(contextStart, contextEnd).join(' ');
    }
    
    detectMultipleInsults(text) {
        const insults = [];
        const words = text.split(/\s+/);
        
        for (const word of words) {
            const detection = this.detectInsult(word);
            if (detection && !insults.find(i => i.insult === detection.insult)) {
                insults.push(detection);
            }
        }
        
        return insults;
    }
    
    countInsults(text) {
        const insults = this.detectMultipleInsults(text);
        return insults.length;
    }
    
    isInsult(text) {
        return this.detectInsult(text) !== null;
    }
    
    getInsultType(insult) {
        const normalized = this.normalizeText(insult);
        
        if (this.frenchInsults.includes(normalized)) {
            return 'french';
        }
        
        if (this.englishInsults.includes(normalized)) {
            return 'english';
        }
        
        if (this.customWords.forbidden.includes(normalized)) {
            return 'custom';
        }
        
        return 'unknown';
    }
    
    getInsultSeverity(insult) {
        const severeInsults = [
            'putain', 'pute', 'connard', 'con', 'salope', 'enculé', 'fils de pute',
            'fuck', 'shit', 'cunt', 'whore', 'slut', 'nigger', 'faggot'
        ];
        
        const normalized = this.normalizeText(insult);
        
        if (severeInsults.some(sev => this.normalizeText(sev) === normalized)) {
            return 'high';
        }
        
        return 'medium';
    }
}

const insultDetector = new InsultDetector();

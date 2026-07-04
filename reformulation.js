class ReformulationEngine {
    constructor() {
        this.reformulations = {
            'putain': [
                'Zut',
                'Mince',
                'Oh là là',
                'Fichtre',
                'Tant pis',
                'C\'est dommage',
                'C\'est regrettable',
                'C\'est unfortunate',
                'Dommage',
                'Quel dommage'
            ],
            'con': [
                'bête',
                'sot',
                'naïf',
                'inexpérimenté',
                'ignorant',
                'maladroit',
                'malavisé',
                'imprudent',
                'inconsidéré',
                'étourdi'
            ],
            'merde': [
                'déchets',
                'ordures',
                'problèmes',
                'difficultés',
                'ennuis',
                'soucis',
                'complications',
                'embarras',
                'désagréments',
                'tracas'
            ],
            'bordel': [
                'quel désordre',
                'quel chaos',
                'c\'est le bazar',
                'c\'est en désordre',
                'c\'est confus',
                'c\'est compliqué',
                'c\'est problématique',
                'c\'est difficile',
                'c\'est complexe',
                'c\'est trouble'
            ],
            'chier': [
                'c\'est pénible',
                'c\'est fatiguant',
                'c\'est agaçant',
                'c\'est frustrant',
                'c\'est ennuyeux',
                'c\'est lassant',
                'c\'est fastidieux',
                'c\'est laborieux',
                'c\'est difficile',
                'c\'est exigeant'
            ],
            'enculé': [
                'désagréable',
                'antipathique',
                'désagréable',
                'malveillant',
                'hostile',
                'inamical',
                'froid',
                'distant',
                'réservé',
                'rebutant'
            ],
            'fils de pute': [
                'personne mal élevée',
                'personne impolie',
                'personne discourtoise',
                'personne grossière',
                'personne vulgaire',
                'personne sans éducation',
                'personne sans manières',
                'personne sans savoir-vivre',
                'personne sans respect',
                'personne sans considération'
            ],
            'ta gueule': [
                'tais-toi s\'il te plaît',
                'pourrais-tu te taire',
                'je préfère que tu ne parles pas',
                's\'il te plaît, reste silencieux',
                'je t\'invite au silence',
                'pourrais-tu baisser le ton',
                'je préférerais que tu ne continues pas',
                'pourrais-tu arrêter de parler',
                'je t\'en prie, arrête',
                's\'il te plaît, arrête'
            ],
            'connard': [
                'personne désagréable',
                'personne antipathique',
                'personne malveillante',
                'personne hostile',
                'personne inamicale',
                'personne froide',
                'personne distante',
                'personne réservée',
                'personne rebutante',
                'personne désagréable'
            ],
            'salope': [
                'personne légère',
                'personne facile',
                'personne sans principes',
                'personne sans morale',
                'personne sans valeurs',
                'personne sans scrupules',
                'personne sans conscience',
                'personne sans dignité',
                'personne sans respect',
                'personne sans honneur'
            ],
            'connasse': [
                'personne désagréable',
                'personne antipathique',
                'personne malveillante',
                'personne hostile',
                'personne inamicale',
                'personne froide',
                'personne distante',
                'personne réservée',
                'personne rebutante',
                'personne acariâtre'
            ],
            'imbécile': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'idiot': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'stupide': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'crétin': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'abruti': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'débile': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'mongol': [
                'personne lente',
                'personne patiente',
                'personne calme',
                'personne tranquille',
                'personne sereine',
                'personne paisible',
                'personne réfléchie',
                'personne thoughtful',
                'personne contemplative',
                'personne méditative'
            ],
            'taré': [
                'personne excentrique',
                'personne originale',
                'personne unique',
                'personne différente',
                'personne particulière',
                'personne singulière',
                'personne exceptionnelle',
                'personne remarquable',
                'personne extraordinaire',
                'personne spéciale'
            ],
            'fou': [
                'personne excentrique',
                'personne originale',
                'personne unique',
                'personne différente',
                'personne particulière',
                'personne singulière',
                'personne exceptionnelle',
                'personne remarquable',
                'personne extraordinaire',
                'personne spéciale'
            ],
            'malade': [
                'personne malade',
                'personne souffrante',
                'personne affaiblie',
                'personne fatiguée',
                'personne épuisée',
                'personne éprouvée',
                'personne affectée',
                'personne touchée',
                'personne atteinte',
                'personne incommodée'
            ],
            'pédé': [
                'personne homosexuelle',
                'personne gay',
                'personne LGBTQ+',
                'personne de la communauté',
                'personne de la diversité',
                'personne de l\'inclusion',
                'personne de l\'acceptation',
                'personne de l\'amour',
                'personne de la liberté',
                'personne de l\'égalité'
            ],
            'tapette': [
                'personne homosexuelle',
                'personne gay',
                'personne LGBTQ+',
                'personne de la communauté',
                'personne de la diversité',
                'personne de l\'inclusion',
                'personne de l\'acceptation',
                'personne de l\'amour',
                'personne de la liberté',
                'personne de l\'égalité'
            ],
            'gringue': [
                'personne étrangère',
                'personne venue d\'ailleurs',
                'personne d\'origine différente',
                'personne de culture différente',
                'personne de nationalité différente',
                'personne de pays différent',
                'personne de région différente',
                'personne de communauté différente',
                'personne de background différent',
                'personne d\'origine diverse'
            ],
            'bouffon': [
                'personne amusante',
                'personne drôle',
                'personne humoristique',
                'personne comique',
                'personne divertissante',
                'personne plaisante',
                'personne récréative',
                'personne ludique',
                'personne joyeuse',
                'personne gaie'
            ],
            'andouille': [
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive',
                'personne négligente',
                'personne insouciante',
                'personne irréfléchie'
            ],
            'branleur': [
                'personne paresseuse',
                'personne oisive',
                'personne inactive',
                'personne inactive',
                'personne nonchalante',
                'personne indolente',
                'personne fainéante',
                'personne oisive',
                'personne apathique',
                'personne passive'
            ],
            'chiant': [
                'ennuyeux',
                'pénible',
                'fatiguant',
                'agaçant',
                'frustrant',
                'lassant',
                'fastidieux',
                'laborieux',
                'difficile',
                'exigeant'
            ],
            'corniaud': [
                'personne naïve',
                'personne crédule',
                'personne innocente',
                'personne simple',
                'personne candide',
                'personne ingénue',
                'personne pure',
                'personne sincère',
                'personne honnête',
                'personne loyale'
            ],
            'dégénéré': [
                'personne différente',
                'personne alternative',
                'personne non conventionnelle',
                'personne hors norme',
                'personne marginale',
                'personne atypique',
                'personne originale',
                'personne unique',
                'personne singulière',
                'personne exceptionnelle'
            ],
            'dégueulasse': [
                'dégoûtant',
                'répugnant',
                'écœurant',
                'nauséabond',
                'déplaisant',
                'désagréable',
                'repoussant',
                'odieux',
                'exécrable',
                'abominable'
            ],
            'empoté': [
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive',
                'personne négligente',
                'personne insouciante',
                'personne irréfléchie'
            ],
            'enflure': [
                'personne arrogante',
                'personne hautaine',
                'personne prétentieuse',
                'personne vaniteuse',
                'personne orgueilleuse',
                'personne suffisant',
                'personne superbe',
                'personne dédaigneuse',
                'personne méprisante',
                'personne condescendante'
            ],
            'épave': [
                'personne fatiguée',
                'personne épuisée',
                'personne éprouvée',
                'personne affectée',
                'personne touchée',
                'personne atteinte',
                'personne incommodée',
                'personne affaiblie',
                'personne affligée',
                'personne accablée'
            ],
            'fauché': [
                'personne sans argent',
                'personne sans ressources',
                'personne sans moyens',
                'personne sans fortune',
                'personne sans richesse',
                'personne sans aisance',
                'personne sans confort',
                'personne sans opulence',
                'personne sans abondance',
                'personne sans prospérité'
            ],
            'fifre': [
                'personne timide',
                'personne réservée',
                'personne discrète',
                'personne effacée',
                'personne modeste',
                'personne humble',
                'personne simple',
                'personne sobre',
                'personne austère',
                'personne retirée'
            ],
            'flippé': [
                'personne effrayée',
                'personne effrayable',
                'personne craintive',
                'personne peureuse',
                'personne anxieuse',
                'personne nerveuse',
                'personne inquiète',
                'personne soucieuse',
                'personne préoccupée',
                'personne troublée'
            ],
            'frelon': [
                'personne active',
                'personne dynamique',
                'personne énergique',
                'personne vive',
                'personne alerte',
                'personne vive',
                'personne brillante',
                'personne rayonnante',
                'personne enthousiaste',
                'personne passionnée'
            ],
            'frigide': [
                'personne réservée',
                'personne discrète',
                'personne prudente',
                'personne circonspecte',
                'personne réfléchie',
                'personne thoughtful',
                'personne contemplative',
                'personne méditative',
                'personne introspective',
                'personne analytique'
            ],
            'goujat': [
                'personne grossière',
                'personne vulgaire',
                'personne sans éducation',
                'personne sans manières',
                'personne sans savoir-vivre',
                'personne sans politesse',
                'personne sans courtoisie',
                'personne sans respect',
                'personne sans considération',
                'personne sans délicatesse'
            ],
            'graille': [
                'nourriture',
                'alimentation',
                'cuisine',
                'repas',
                'mets',
                'plat',
                'viande',
                'nourriture',
                'subsistance',
                'sustentation'
            ],
            'grognasse': [
                'personne maussade',
                'personne morose',
                'personne sombre',
                'personne mélancolique',
                'personne triste',
                'personne abattue',
                'personne déprimée',
                'personne découragée',
                'personne désespérée',
                'personne abattue'
            ],
            'gueule': [
                'visage',
                'figure',
                'minois',
                'physionomie',
                'traits',
                'apparence',
                'aspect',
                'air',
                'allure',
                'expression'
            ],
            'hurluberlu': [
                'personne excentrique',
                'personne originale',
                'personne unique',
                'personne différente',
                'personne particulière',
                'personne singulière',
                'personne exceptionnelle',
                'personne remarquable',
                'personne extraordinaire',
                'personne spéciale'
            ],
            'ignare': [
                'personne inexpérimentée',
                'personne novice',
                'personne débutante',
                'personne apprentie',
                'personne néophyte',
                'personne initiée',
                'personne instruite',
                'personne éduquée',
                'personne formée',
                'personne qualifiée'
            ],
            'incompétent': [
                'personne inexpérimentée',
                'personne novice',
                'personne débutante',
                'personne apprentie',
                'personne néophyte',
                'personne initiée',
                'personne instruite',
                'personne éduquée',
                'personne formée',
                'personne qualifiée'
            ],
            'inculte': [
                'personne sans éducation',
                'personne sans instruction',
                'personne sans culture',
                'personne sans savoir',
                'personne sans connaissance',
                'personne sans information',
                'personne sans érudition',
                'personne sans instruction',
                'personne sans apprentissage',
                'personne sans formation'
            ],
            'inutile': [
                'personne non productive',
                'personne inefficace',
                'personne inefficace',
                'personne improductive',
                'personne stérile',
                'personne vaine',
                'personne futile',
                'personne superflue',
                'personne superflue',
                'personne excédentaire'
            ],
            'lâche': [
                'personne prudente',
                'personne circonspecte',
                'personne réfléchie',
                'personne thoughtful',
                'personne contemplative',
                'personne méditative',
                'personne introspective',
                'personne analytique',
                'personne raisonnée',
                'personne logique'
            ],
            'lâcheur': [
                'personne prudente',
                'personne circonspecte',
                'personne réfléchie',
                'personne thoughtful',
                'personne contemplative',
                'personne méditative',
                'personne introspective',
                'personne analytique',
                'personne raisonnée',
                'personne logique'
            ],
            'looser': [
                'personne malchanceuse',
                'personne défavorisée',
                'personne désavantagée',
                'personne handicapée',
                'personne limitée',
                'personne restreinte',
                'personne contrainte',
                'personne gênée',
                'personne entravée',
                'personne empêchée'
            ],
            'loubard': [
                'personne de la rue',
                'personne du quartier',
                'personne du voisinage',
                'personne de la communauté',
                'personne du milieu',
                'personne de l\'environnement',
                'personne du contexte',
                'personne du cadre',
                'personne du décor',
                'personne du paysage'
            ],
            'manche': [
                'personne sans valeur',
                'personne sans importance',
                'personne sans signification',
                'personne sans intérêt',
                'personne sans pertinence',
                'personne sans utilité',
                'personne sans but',
                'personne sans objectif',
                'personne sans but',
                'personne sans ambition'
            ],
            'merdique': [
                'de mauvaise qualité',
                'de qualité inférieure',
                'de qualité médiocre',
                'de qualité pauvre',
                'de qualité insuffisante',
                'de qualité inadéquate',
                'de qualité inappropriée',
                'de qualité inacceptable',
                'de qualité insatisfaisante',
                'de qualité décevante'
            ],
            'minable': [
                'personne sans valeur',
                'personne sans importance',
                'personne sans signification',
                'personne sans intérêt',
                'personne sans pertinence',
                'personne sans utilité',
                'personne sans but',
                'personne sans objectif',
                'personne sans but',
                'personne sans ambition'
            ],
            'miteux': [
                'personne sans ressources',
                'personne sans moyens',
                'personne sans fortune',
                'personne sans richesse',
                'personne sans aisance',
                'personne sans confort',
                'personne sans opulence',
                'personne sans abondance',
                'personne sans prospérité',
                'personne sans abondance'
            ],
            'moc': [
                'personne sale',
                'personne malpropre',
                'personne négligée',
                'personne mal tenue',
                'personne mal soignée',
                'personne mal entretenue',
                'personne mal présentée',
                'personne mal apprêtée',
                'personne mal parée',
                'personne mal vêtue'
            ],
            'mollasson': [
                'personne douce',
                'personne tendre',
                'personne sensible',
                'personne délicate',
                'personne fine',
                'personne subtile',
                'personne raffinée',
                'personne élégante',
                'personne distinguée',
                'personne cultivée'
            ],
            'monstre': [
                'personne exceptionnelle',
                'personne remarquable',
                'personne extraordinaire',
                'personne spéciale',
                'personne unique',
                'personne singulière',
                'personne particulière',
                'personne différente',
                'personne originale',
                'personne atypique'
            ],
            'mou': [
                'personne douce',
                'personne tendre',
                'personne sensible',
                'personne délicate',
                'personne fine',
                'personne subtile',
                'personne raffinée',
                'personne élégante',
                'personne distinguée',
                'personne cultivée'
            ],
            'naze': [
                'personne fatiguée',
                'personne épuisée',
                'personne éprouvée',
                'personne affectée',
                'personne touchée',
                'personne atteinte',
                'personne incommodée',
                'personne affaiblie',
                'personne affligée',
                'personne accablée'
            ],
            'nul': [
                'personne inexpérimentée',
                'personne novice',
                'personne débutante',
                'personne apprentie',
                'personne néophyte',
                'personne initiée',
                'personne instruite',
                'personne éduquée',
                'personne formée',
                'personne qualifiée'
            ],
            'ordure': [
                'personne malpropre',
                'personne sale',
                'personne négligée',
                'personne mal tenue',
                'personne mal soignée',
                'personne mal entretenue',
                'personne mal présentée',
                'personne mal apprêtée',
                'personne mal parée',
                'personne mal vêtue'
            ],
            'pignouf': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'plouc': [
                'personne de la campagne',
                'personne rurale',
                'personne provinciale',
                'personne de province',
                'personne de la région',
                'personne du terroir',
                'personne de la terre',
                'personne du pays',
                'personne de l\'endroit',
                'personne du lieu'
            ],
            'pochard': [
                'personne qui a bu',
                'personne alcoolisée',
                'personne ivre',
                'personne éméchée',
                'personne soûle',
                'personne enivrée',
                'personne grisée',
                'personne titubante',
                'personne chancelante',
                'personne vacillante'
            ],
            'pouffiasse': [
                'personne légère',
                'personne facile',
                'personne sans principes',
                'personne sans morale',
                'personne sans valeurs',
                'personne sans scrupules',
                'personne sans conscience',
                'personne sans dignité',
                'personne sans respect',
                'personne sans honneur'
            ],
            'pourri': [
                'personne corrompue',
                'personne viciée',
                'personne altérée',
                'personne dégradée',
                'personne détériorée',
                'personne abîmée',
                'personne endommagée',
                'personne compromise',
                'personne entachée',
                'personne souillée'
            ],
            'prétentieux': [
                'personne ambitieuse',
                'personne aspirante',
                'personne désireuse',
                'personne avide',
                'personne enthousiaste',
                'personne passionnée',
                'personne motivée',
                'personne déterminée',
                'personne résolue',
                'personne engagée'
            ],
            'raté': [
                'personne malchanceuse',
                'personne défavorisée',
                'personne désavantagée',
                'personne handicapée',
                'personne limitée',
                'personne restreinte',
                'personne contrainte',
                'personne gênée',
                'personne entravée',
                'personne empêchée'
            ],
            'ringard': [
                'personne démodée',
                'personne passée',
                'personne surannée',
                'personne ancienne',
                'personne vieillie',
                'personne désuète',
                'personne obsolète',
                'personne archaïque',
                'personne antique',
                'personne périmée'
            ],
            'sac à merde': [
                'personne malpropre',
                'personne sale',
                'personne négligée',
                'personne mal tenue',
                'personne mal soignée',
                'personne mal entretenue',
                'personne mal présentée',
                'personne mal apprêtée',
                'personne mal parée',
                'personne mal vêtue'
            ],
            'sanguinaire': [
                'personne passionnée',
                'personne intense',
                'personne ardente',
                'personne fervente',
                'personne zealoue',
                'personne enthousiaste',
                'personne énergique',
                'personne dynamique',
                'personne vive',
                'personne active'
            ],
            'satané': [
                'maudit',
                'malédiction',
                'malheureux',
                'infortuné',
                'défavorisé',
                'désavantagé',
                'handicapé',
                'limité',
                'restreint',
                'contraint'
            ],
            'sauvage': [
                'naturel',
                'authentique',
                'genuin',
                'pur',
                'simple',
                'candid',
                'ingénu',
                'innocent',
                'sincère',
                'honnête'
            ],
            'sombre': [
                'sérieux',
                'grave',
                'solennel',
                'profond',
                'intense',
                'marqué',
                'prononcé',
                'accentué',
                'caractérisé',
                'distinct'
            ],
            'sot': [
                'personne naïve',
                'personne inexpérimentée',
                'personne ignorante',
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive'
            ],
            'tache': [
                'marque',
                'tache',
                'souillure',
                'salissure',
                'tache',
                'macule',
                'tache',
                'tache',
                'tache',
                'tache'
            ],
            'tocard': [
                'personne maladroite',
                'personne malavisée',
                'personne imprudente',
                'personne inconsidérée',
                'personne étourdie',
                'personne distraite',
                'personne inattentive',
                'personne négligente',
                'personne insouciante',
                'personne irréfléchie'
            ],
            'tordu': [
                'personne complexe',
                'personne compliquée',
                'personne sophistiquée',
                'personne nuancée',
                'personne subtile',
                'personne raffinée',
                'personne élaborée',
                'personne développée',
                'personne avancée',
                'personne évoluée'
            ],
            'traînée': [
                'personne lente',
                'personne paresseuse',
                'personne oisive',
                'personne inactive',
                'personne nonchalante',
                'personne indolente',
                'personne fainéante',
                'personne apathique',
                'personne passive',
                'personne tranquille'
            ],
            'traînard': [
                'personne lente',
                'personne paresseuse',
                'personne oisive',
                'personne inactive',
                'personne nonchalante',
                'personne indolente',
                'personne fainéante',
                'personne apathique',
                'personne passive',
                'personne tranquille'
            ],
            'truand': [
                'personne marginale',
                'personne alternative',
                'personne non conventionnelle',
                'personne hors norme',
                'personne atypique',
                'personne originale',
                'personne unique',
                'personne singulière',
                'personne exceptionnelle',
                'personne remarquable'
            ],
            'vaurien': [
                'personne marginale',
                'personne alternative',
                'personne non conventionnelle',
                'personne hors norme',
                'personne atypique',
                'personne originale',
                'personne unique',
                'personne singulière',
                'personne exceptionnelle',
                'personne remarquable'
            ],
            'veule': [
                'personne douce',
                'personne tendre',
                'personne sensible',
                'personne délicate',
                'personne fine',
                'personne subtile',
                'personne raffinée',
                'personne élégante',
                'personne distinguée',
                'personne cultivée'
            ],
            'vidange': [
                'personne vide',
                'personne sans substance',
                'personne sans contenu',
                'personne sans matière',
                'personne sans essence',
                'personne sans âme',
                'personne sans esprit',
                'personne sans intelligence',
                'personne sans pensée',
                'personne sans réflexion'
            ],
            'zob': [
                'personne malpropre',
                'personne sale',
                'personne négligée',
                'personne mal tenue',
                'personne mal soignée',
                'personne mal entretenue',
                'personne mal présentée',
                'personne mal apprêtée',
                'personne mal parée',
                'personne mal vêtue'
            ],
            'fuck': [
                'darn',
                'shoot',
                'heck',
                'dang',
                'blast',
                'fudge',
                'sugar',
                'fiddlesticks',
                'rats',
                'phooey'
            ],
            'shit': [
                'crap',
                'junk',
                'stuff',
                'mess',
                'trouble',
                'problem',
                'issue',
                'difficulty',
                'nonsense',
                'garbage'
            ],
            'bitch': [
                'difficult person',
                'unpleasant person',
                'mean person',
                'rude person',
                'unkind person',
                'harsh person',
                'strict person',
                'demanding person',
                'challenging person',
                'tough person'
            ],
            'bastard': [
                'person of unknown parentage',
                'person born out of wedlock',
                'person without father',
                'person without married parents',
                'person of uncertain origin',
                'person of unclear background',
                'person of questionable parentage',
                'person of dubious lineage',
                'person of uncertain descent',
                'person of unknown ancestry'
            ],
            'ass': [
                'donkey',
                'fool',
                'idiot',
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being'
            ],
            'asshole': [
                'unpleasant person',
                'mean person',
                'rude person',
                'unkind person',
                'harsh person',
                'difficult person',
                'challenging person',
                'tough person',
                'demanding person',
                'strict person'
            ],
            'damn': [
                'darn',
                'dang',
                'blast',
                'shoot',
                'heck',
                'fudge',
                'sugar',
                'fiddlesticks',
                'rats',
                'phooey'
            ],
            'hell': [
                'heck',
                'darn',
                'dang',
                'blast',
                'shoot',
                'fudge',
                'sugar',
                'fiddlesticks',
                'rats',
                'phooey'
            ],
            'dick': [
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being',
                'guy',
                'man',
                'fellow'
            ],
            'cock': [
                'rooster',
                'bird',
                'fowl',
                'poultry',
                'chicken',
                'hen',
                'bantam',
                'capon',
                'pullet',
                'cockerel'
            ],
            'pussy': [
                'cat',
                'kitten',
                'feline',
                'pet',
                'animal',
                'creature',
                'mammal',
                'companion',
                'friend',
                'pet'
            ],
            'cunt': [
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being',
                'woman',
                'lady',
                'female'
            ],
            'whore': [
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being',
                'woman',
                'lady',
                'female'
            ],
            'slut': [
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being',
                'woman',
                'lady',
                'female'
            ],
            'dumbass': [
                'uninformed person',
                'ignorant person',
                'uneducated person',
                'naive person',
                'inexperienced person',
                'simple person',
                'uncomplicated person',
                'straightforward person',
                'direct person',
                'honest person'
            ],
            'retard': [
                'person with disability',
                'person with special needs',
                'person with challenges',
                'person with difficulties',
                'person with limitations',
                'person with restrictions',
                'person with constraints',
                'person with obstacles',
                'person with barriers',
                'person with hurdles'
            ],
            'idiot': [
                'uninformed person',
                'ignorant person',
                'uneducated person',
                'naive person',
                'inexperienced person',
                'simple person',
                'uncomplicated person',
                'straightforward person',
                'direct person',
                'honest person'
            ],
            'stupid': [
                'uninformed person',
                'ignorant person',
                'uneducated person',
                'naive person',
                'inexperienced person',
                'simple person',
                'uncomplicated person',
                'straightforward person',
                'direct person',
                'honest person'
            ],
            'moron': [
                'uninformed person',
                'ignorant person',
                'uneducated person',
                'naive person',
                'inexperienced person',
                'simple person',
                'uncomplicated person',
                'straightforward person',
                'direct person',
                'honest person'
            ],
            'loser': [
                'unfortunate person',
                'disadvantaged person',
                'challenged person',
                'limited person',
                'restricted person',
                'constrained person',
                'hindered person',
                'impeded person',
                'prevented person',
                'blocked person'
            ],
            'scumbag': [
                'unpleasant person',
                'mean person',
                'rude person',
                'unkind person',
                'harsh person',
                'difficult person',
                'challenging person',
                'tough person',
                'demanding person',
                'strict person'
            ],
            'jackass': [
                'donkey',
                'fool',
                'idiot',
                'person',
                'individual',
                'someone',
                'somebody',
                'character',
                'soul',
                'being'
            ],
            'jerk': [
                'unpleasant person',
                'mean person',
                'rude person',
                'unkind person',
                'harsh person',
                'difficult person',
                'challenging person',
                'tough person',
                'demanding person',
                'strict person'
            ],
            'suck': [
                'be disappointing',
                'be unsatisfactory',
                'be inadequate',
                'be insufficient',
                'be lacking',
                'be wanting',
                'be deficient',
                'be incomplete',
                'be imperfect',
                'be flawed'
            ]
        };
        
        this.phraseReformulations = {
            'putain il est con': [
                'Il me dérange vraiment',
                'Il est vraiment agaçant',
                'Je le trouve difficile',
                'Il me pose problème',
                'Je ne l\'apprécie pas',
                'Il est pénible',
                'Je suis frustré par lui',
                'Il me fatigue',
                'Je suis énervé',
                'C\'est difficile avec lui'
            ],
            'c\'est de la merde': [
                'C\'est décevant',
                'C\'est insatisfaisant',
                'C\'est de mauvaise qualité',
                'C\'est médiocre',
                'C\'est pauvre',
                'C\'est insuffisant',
                'C\'est inadéquat',
                'C\'est inapproprié',
                'C\'est inacceptable',
                'C\'est décevant'
            ],
            'ferme ta gueule': [
                'Tais-toi s\'il te plaît',
                'Pourrais-tu te taire',
                'Je préfère que tu ne parles pas',
                'S\'il te plaît, reste silencieux',
                'Je t\'invite au silence',
                'Pourrais-tu baisser le ton',
                'Je préférerais que tu ne continues pas',
                'Pourrais-tu arrêter de parler',
                'Je t\'en prie, arrête',
                'S\'il te plaît, arrête'
            ],
            'tu es un con': [
                'Tu es maladroit',
                'Tu es imprudent',
                'Tu es inconsidéré',
                'Tu es étourdi',
                'Tu es distrait',
                'Tu es inattentif',
                'Tu es négligent',
                'Tu es insouciant',
                'Tu es irréfléchi',
                'Tu es malavisé'
            ],
            'c\'est n\'importe quoi': [
                'C\'est confus',
                'C\'est désorganisé',
                'C\'est chaotique',
                'C\'est problématique',
                'C\'est difficile',
                'C\'est complexe',
                'C\'est compliqué',
                'C\'est trouble',
                'C\'est incertain',
                'C\'est douteux'
            ],
            'je m\'en fous': [
                'Je ne m\'en soucie pas',
                'Cela ne me concerne pas',
                'Je suis indifférent',
                'Je ne suis pas concerné',
                'Cela n\'a pas d\'importance pour moi',
                'Je ne suis pas intéressé',
                'Je ne suis pas impliqué',
                'Je ne suis pas engagé',
                'Je ne suis pas affecté',
                'Je ne suis pas touché'
            ],
            'c\'est chiant': [
                'C\'est ennuyeux',
                'C\'est pénible',
                'C\'est fatiguant',
                'C\'est agaçant',
                'C\'est frustrant',
                'C\'est lassant',
                'C\'est fastidieux',
                'C\'est laborieux',
                'C\'est difficile',
                'C\'est exigeant'
            ],
            'tu es nul': [
                'Tu es inexpérimenté',
                'Tu es novice',
                'Tu es débutant',
                'Tu es apprenti',
                'Tu es en apprentissage',
                'Tu es en formation',
                'Tu es en développement',
                'Tu es en progression',
                'Tu es en amélioration',
                'Tu es en évolution'
            ],
            'c\'est degueulasse': [
                'C\'est dégoûtant',
                'C\'est répugnant',
                'C\'est écœurant',
                'C\'est nauséabond',
                'C\'est déplaisant',
                'C\'est désagréable',
                'C\'est repoussant',
                'C\'est odieux',
                'C\'est exécrable',
                'C\'est abominable'
            ],
            'je suis deg': [
                'Je suis fatigué',
                'Je suis épuisé',
                'Je suis éprouvé',
                'Je suis affecté',
                'Je suis touché',
                'Je suis atteint',
                'Je suis incommodé',
                'Je suis affaibli',
                'Je suis affligé',
                'Je suis accablé'
            ]
        };
    }
    
    getReformulations(insult) {
        const normalized = insult.toLowerCase().trim();
        
        if (this.reformulations[normalized]) {
            return this.reformulations[normalized];
        }
        
        for (const [key, values] of Object.entries(this.reformulations)) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return values;
            }
        }
        
        return this.generateGenericReformulations(insult);
    }
    
    getPhraseReformulations(phrase) {
        const normalized = phrase.toLowerCase().trim();
        
        if (this.phraseReformulations[normalized]) {
            return this.phraseReformulations[normalized];
        }
        
        for (const [key, values] of Object.entries(this.phraseReformulations)) {
            if (normalized.includes(key)) {
                return values;
            }
        }
        
        return this.generateGenericPhraseReformulations(phrase);
    }
    
    generateGenericReformulations(insult) {
        return [
            'Évite ce mot',
            'Utilise un vocabulaire plus approprié',
            'Choisis tes mots avec soin',
            'Exprime-toi différemment',
            'Trouve une autre façon de dire cela',
            'Utilise un langage plus respectueux',
            'Parle avec plus de courtoisie',
            'Sois plus diplomate',
            'Adapte ton langage',
            'Fais preuve de tact'
        ];
    }
    
    generateGenericPhraseReformulations(phrase) {
        return [
            'Exprime cela autrement',
            'Reformule ta pensée',
            'Dis-le différemment',
            'Trouve une meilleure formulation',
            'Utilise un langage plus approprié',
            'Sois plus respectueux dans ton expression',
            'Adapte ton message',
            'Modifie ta façon de parler',
            'Change ta formulation',
            'Améliore ton expression'
        ];
    }
    
    getRandomReformulation(insult) {
        const reformulations = this.getReformulations(insult);
        const randomIndex = Math.floor(Math.random() * reformulations.length);
        return reformulations[randomIndex];
    }
    
    getRandomPhraseReformulation(phrase) {
        const reformulations = this.getPhraseReformulations(phrase);
        const randomIndex = Math.floor(Math.random() * reformulations.length);
        return reformulations[randomIndex];
    }
    
    getMultipleReformulations(insult, count = 3) {
        const reformulations = this.getReformulations(insult);
        const shuffled = reformulations.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, reformulations.length));
    }
    
    getMultiplePhraseReformulations(phrase, count = 3) {
        const reformulations = this.getPhraseReformulations(phrase);
        const shuffled = reformulations.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, reformulations.length));
    }
    
    addCustomReformulation(insult, reformulation) {
        const normalized = insult.toLowerCase().trim();
        
        if (!this.reformulations[normalized]) {
            this.reformulations[normalized] = [];
        }
        
        if (!this.reformulations[normalized].includes(reformulation)) {
            this.reformulations[normalized].push(reformulation);
        }
    }
    
    addCustomPhraseReformulation(phrase, reformulation) {
        const normalized = phrase.toLowerCase().trim();
        
        if (!this.phraseReformulations[normalized]) {
            this.phraseReformulations[normalized] = [];
        }
        
        if (!this.phraseReformulations[normalized].includes(reformulation)) {
            this.phraseReformulations[normalized].push(reformulation);
        }
    }
    
    explainWhyBetter(original, reformulation) {
        const explanations = [
            `Cette reformulation est plus respectueuse et professionnelle.`,
            `Cette formulation exprime la même idée sans utiliser de langage offensif.`,
            `Ce choix de mots montre plus de maturité et de considération.`,
            `Cette version est plus appropriée pour la communication.`,
            `Cette reformulation permet de transmettre ton message sans heurter.`,
            `Cette formulation est plus constructive et positive.`,
            `Cette version démontre un meilleur vocabulaire et une meilleure expression.`,
            `Cette reformulation favorise une communication plus harmonieuse.`,
            `Cette formulation est plus adaptée au contexte professionnel ou social.`,
            `Cette version montre que tu sais t\'exprimer avec élégance.`
        ];
        
        const randomIndex = Math.floor(Math.random() * explanations.length);
        return explanations[randomIndex];
    }
    
    getEncouragement() {
        const encouragements = [
            'Tu fais des progrès, continue comme ça !',
            'Chaque reformulation est une victoire !',
            'Tu es sur la bonne voie !',
            'Ton langage s\'améliore chaque jour !',
            'Continue tes efforts, ça porte ses fruits !',
            'Tu deviens plus maîtrisé dans ton expression !',
            'Tes progrès sont remarquables !',
            'Tu es en train de changer tes habitudes positivement !',
            'Chaque mot compte, et tu le fais bien !',
            'Ta persévérance paiera !'
        ];
        
        const randomIndex = Math.floor(Math.random() * encouragements.length);
        return encouragements[randomIndex];
    }
}

const reformulationEngine = new ReformulationEngine();

const moo = require('./moo.js')
//const {itterat


//PROPROCESSEURS
//let mode = 'console'
//let identation = true
//let importation = []

let context = moo.compile({
    NL : {match: '\r\n', lineBreaks:true},
    PREPROCESSOR:/#\w+/,
    COMMENTS1: /\/\/ *[a-zA-Z]*/,
    COMMENTS2: /\[[a-zA-Z _]+\]:/,
    STRINGS1: /"(?:\w|`"|\t|[:;`~!@#$\\%\^&*()_\-+\]\[{'?\/>\.,<}]|\s)*"/,
    STRINGS2: /'(?:\w|`'|\t|[:;`~!@#$\\%\^&*()_\-+\]\[{"?\/>\.,<}]|\s)*'/,
    NUMBERREAL: /[0-9]+ *. *[0-9]+/,
    NUMBERINT: /[0-9]+/,
    SUPERVAR: /IC_[a-zA-Z_]+/,
    SYMBOLSBLOCS: {match: /[\[\]{}()]/, type: moo.keywords({
        BRACKETOPEN : '[',
        BRACKETCLOSE: ']',
        BRACETOPEN: '{',
        BRACECLOSE: '}',
        PARANTESISOPEN: '(',
        PARANTESISCLOSE: ')'
    })},
    SYMBOLS1 : {match: /[\=><\/\-+*&\:\.\^!;,$]+/, type: moo.keywords({
        OBJECTCALL: '.',
        OBJECTINIT: ':',
        KW : ['<=='],
        CONDITIONNEL: [ '==', '>', '<', '!=', '<=', '>='],
        AFFECTATION: ['<--', '='],
        ARITHMETIQUE: ['+', '-', '*', '/'],
        ENDINST: [ ';'],
        INSTSEP: [ ','],
        
    })},
    IDENTIFIANTS : {match:/[a-zA-Z\d_]+/, type: moo.keywords({
        TYPES: ['entier', 'chaine', 'reel', 'objet'],
        KW : ['local', 'halt', 'retourner', 'PRINCIPAL', 'inst', 'dans', 'herite', 'native', 'lire', 'ecrire', 'ecrirel', 'parRef', 'finApp', 'allervers', 'lancer', 'arreter', 'pause'],
        CONDITIONNEL: ['Et', 'Ou', 'Non', 'eq', 'sup', 'inf', 'dif'],
        AFFECTATION: ['eg', 'affect'],
        BOOLEENE: ['vrais', 'faut'],
        BLOCOPENER : ['alors', 'fait', 'contien', 'comprend', 'DEBUT', 'fois', 'DEBUTPROGRAMME'],
        BLOCCLOSER : ['fsi', 'ff', 'fboucle', 'fpour', 'ftanq', 'fclasse', 'FIN', 'FINPROGRAMME'],
        ENDINST: ['finst'],
        INSTSEP: ['et'],
        
        siDef: 'si',
        siNonDef: 'sinon',
        pourDef: 'pour',
        boucleDef: 'boucler',
        classeDef: 'classe',
        varDef: 'var',
        methodeDef: 'methode',
        fonctionDef: 'fonction',
        nativeDef: 'native',
        tanqDef: 'tanq',
        jusquaDef: 'jusqua',
        constructeurDef: 'constructeur'
    })},
    SPC: / +/,
    TAB: /\t+/
//    SYMBOLS: {match: /\W/, lineBreaks: true}
})
    
exports.context = {context}
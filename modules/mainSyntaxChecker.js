
//const moo = require('./moo.js')
const path = require('path')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const output = require('./stdout.js')

function regex(type, lineText, lineN){
    //output.print(type, line)
    var types = "objet|entier|chaine"
    var affectations = "<\\-\\-|=|eg|affect"
    var re = undefined
    switch(type){
        case 'ecrire': {
            re = `ecrire: +.+ *; *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: ecrire: ... ;")
            }
        } break
        case 'lire': {
            re = `lire: *.+ *; *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: lire: ... ;")
            }
        } break
        case 'ecrirel': {
            re = `ecrirel: *.+ *; *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: ecrirel: ... ;")
            }
        } break
        case 'si': {
            re = `si .+ alors *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: si ... alors")
            }
        } break
        case 'sinon': {
			if(new RegExp(`sinon .*`).test(lineText)){
				re1 = `sinon +alors *\r\n`
				re2 = `sinon +si .+ alors *\r\n`
				if((new RegExp(re1).test(lineText)) || (new RegExp(re2).test(lineText))){
					null
				} else {
					//if(!(new RegExp(re).test(lineText))){
						output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: sinon alors || sinon si ... alors")
						//output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: sinon si ... alors")
					//}  
				}
			}
        } break
        case 'pour': {
            re = `pour .+ *((,| et ) *.+)? dans .+ fait *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: pour ... [ et ... ] dans ... fait")
            }
        } break
        case 'boucler': {
            re = `boucler .+ fois *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: boucler ... fois")
            }
        } break
        case 'classe': {
            re = `classe .+ +(herite .+ +)?(contien|comprend) *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: classe ... [herite ...] contien|comprend")
            }
        } break
        case 'var': {
            re = `var +(${types}) +[\\w]+ +(${affectations}) +.+ *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: var types ... affectations ...")
            }
        } break
        case 'methode': {
            re = `methode +(${types}) .+: *.* +fait *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: methode ... : ... fait")
            }
        } break
        case 'fonction': {
            re = `fonction +(${types}) .+: *.* +fait *\r\n`
            if(new RegExp(re).test(lineText)){
               if(!(new RegExp(re).test(lineText))){
                    output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: fonction ... : ... fait")
                }
            } else {
                re = `fonction +PRINCIPAL *.* +fait *\r\n`
                if(!(new RegExp(re).test(lineText))){
                    output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: fonction PRINCIPAL ... fait")
                }
            }
        } break
        case 'native': {
            re = `native *{.*\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: native { ... }")
            }
        } break
        case 'tanq': {
            re = `tanq .+ fait *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: tanq ... fait")
            }
        } break
        case 'jusqua': {
            re = `jusqua .+ alors *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: jusqua ... alors")
            }
        } break
        case 'constructeur': {
            re = `constructeur: *.* fait *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: constructeur: ... fait")
            }
        } break
        case 'DEBUTPROGRAMME': {
            re = `DEBUTPROGRAMME: *("|').*("|') *\r\n`
            if(!(new RegExp(re).test(lineText))){
                output.raise("ERREUR de syntax ( " + type + " ) a la ligne: " + lineN + ", Syntax: DEBUTPROGRAMME: 'text'")
            }
        } break
    }
}

function mainSyntaxChecker(src_path){
    
    output.print("VERIFICATION DES SYNTAX SIMPLE")
    // () {} []
    var o = new itterateur.itterateur(context.context, require('fs').readFileSync( src_path ).toString())
    var token = null
    var kw = null
    var lineTemp = ''
    do {
        token = o.next()
        if(token == null) break
        
        if(kw != null){
            if(token.type == 'NL'){
                lineTemp += token.text
                regex(kw, lineTemp, token.line)
                kw = null
                lineTemp = ''
            } else {
                lineTemp += token.text
            }
        } else {
            switch(token.type){
                case 'KW': {
                    switch(token.text){
                        case 'ecrire': {
                            kw = 'ecrire'
                            lineTemp += token.text
                        } break
                        case 'ecrirel': {
                            kw = 'ecrirel'
                            lineTemp += token.text
                        } break
                        case 'lire': {
                            kw = 'lire'
                            lineTemp += token.text
                        } break
                    }
                } break
                case 'BLOCOPENER': {
                    switch(token.text){
                        case 'DEBUTPROGRAMME': {
                            kw = 'DEBUTPROGRAMME'
                            lineTemp += token.text
                        } break
                    }
                } break
                case 'siDef': {
                    kw = 'si'
                    lineTemp += token.text
                } break
                case 'siNonDef': {
                    kw = 'sinon'
                    lineTemp += token.text
                } break
                case 'pourDef': {
                    kw = 'pour'
                    lineTemp += token.text
                } break
                case 'boucleDef': {
                    kw = 'boucler'
                    lineTemp += token.text
                } break
                case 'classeDef': {
                    kw = 'classe'
                    lineTemp += token.text
                } break
                case 'varDef': {
                    kw = 'var'
                    lineTemp += token.text
                } break
                case 'methodeDef': {
                    kw = 'methode'
                    lineTemp += token.text
                } break
                case 'fonctionDef': {
                    kw = 'fonction'
                    lineTemp += token.text
                } break
                case 'nativeDef': {
                    kw = 'native'
                    lineTemp += token.text
                } break
                case 'tanqDef': {
                    kw = 'tanq'
                    lineTemp += token.text
                } break
                case 'jusquaDef': {
                    kw = 'jusqua'
                    lineTemp += token.text
                } break
                case 'constructeurDef': {
                    kw = 'constructeur'
                    lineTemp += token.text
                } break
            }
        }
        
    } while(true)
}

module.exports = mainSyntaxChecker

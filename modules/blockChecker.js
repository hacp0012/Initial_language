
const moo = require('./moo.js')
const path = require('path')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const output = require('./stdout.js')


function blockChecker(src_path){
    output.print("VERIFICATION DES BLOCKS")
    // () {} []
    var o = new itterateur.itterateur(context.context, require('fs').readFileSync( src_path ).toString())
    var inWait = ''
    var lock = 0
    var inWaitArr = []
    var itter = null
    var entitiBlockCloser = ''
	var sinonDefIs = false
    do{
        itter = o.next()
        if(itter == null){
            if(inWaitArr.length>0){
                output.raise("ERREUR : ( " + inWait + ' ) est manquante.')
            }
            break
        }
        switch(itter.type){
            case "pourDef": {
                entitiBlockCloser = 'fpour'
            } break
			case "siNonDef": {
                sinonDefIs = true
            } break
            case "methodeDef": {
                entitiBlockCloser = 'ff'
            } break
            case "fonctionDef": {
                entitiBlockCloser = 'ff'
            } break
            case "tanqDef": {
                entitiBlockCloser = 'ftanq'
            } break
            case "classeDef": {
                entitiBlockCloser = 'fclasse'
            } break
            case "jusquaDef": {
                entitiBlockCloser = '' // .... FIN
            } break
            case "constructeurDef": {
                entitiBlockCloser = 'ff'
            } break
            case "BLOCOPENER": {
                switch(itter.text){
                    case "alors": {
						if(sinonDefIs == true){
							sinonDefIs = false
						} else {
							inWaitArr.push('fsi')
							lock++
							inWait = 'fsi'
						}
                    } break
                    case "fait": {
                        inWaitArr.push(entitiBlockCloser)
                        lock++
                        inWait = entitiBlockCloser
                    } break
                    case "contien": {
                        inWaitArr.push('fclasse')
                        lock++
                        inWait = 'fclasse'
                    } break
                    case "comprend": {
                        inWaitArr.push('fclasse')
                        lock++
                        inWait = 'fclasse'
                    } break
                    case "DEBUT": {
                        inWaitArr.push('FIN')
                        lock++
                        inWait = 'FIN'
                    } break
                    case "fois": {
                        inWaitArr.push('fboucle')
                        lock++
                        inWait = 'fboucle'
                    } break
                    case "DEBUTPROGRAMME": {
                        inWaitArr.push('FINPROGRAMME')
                        lock++
                        inWait = 'FINPROGRAMME'
                    } break
                }
            } break
            case 'BLOCCLOSER': {
                switch(itter.text){
                    case "fsi": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "fclasse": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "ff": {
                        if(inWait != itter.text){
                        output.print(inWait)
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "fboucle": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "fpour": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "ftanq": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "FIN": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                    case "FINPROGRAMME": {
                        if(inWait != itter.text){
                            output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                        } else {
                            lock--
                            inWaitArr.pop()
                            inWait = inWaitArr[inWaitArr.length-1]
                        }
                    } break
                }
            } break
            case 'BRACKETOPEN': {
                inWaitArr.push(']')
                lock++
                inWait = ']'
            } break
            case 'BRACKETCLOSE': {
                if(inWait != itter.text){
                    output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                } else {
                    lock--
                    inWaitArr.pop()
                    inWait = inWaitArr[inWaitArr.length-1]
                }
            } break
            case 'BRACETOPEN': {
                inWaitArr.push('}')
                lock++
                inWait = '}'
            } break
            case 'BRACECLOSE': {
                if(inWait != itter.text){
                    output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                } else {
                    lock--
                    inWaitArr.pop()
                    inWait = inWaitArr[inWaitArr.length-1]
                }
            } break
            case 'PARANTESISOPEN': {
                inWaitArr.push(')')
                lock++
                inWait = ')'
            } break
            case 'PARANTESISCLOSE': {
                if(inWait != itter.text){
                    output.raise("ERREUR : fermetur incoditionnel ( " + inWait + " ) ligne: " + itter.line)
                } else {
                    lock--
                    inWaitArr.pop()
                    inWait = inWaitArr[inWaitArr.length-1]
                }
            } break
                
        }
    } while(true)

}

module.exports = blockChecker
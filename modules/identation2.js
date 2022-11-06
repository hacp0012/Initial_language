
const moo = require('moo')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
//let codes = require('fs').readFileSync(process.argv[2]).toString()

function print(obj) {console.log(obj)}
const identation = (identation, codes) => {
    if(identation == 'non') return
    var espaces = 0
    var tabs = 0
    var newLine = false
    var lastSpace = ''
    var lastSpaceLine = ''
    var line = 0
    var firstIndent = 0
    var o = new itterateur.itterateur(context.context, codes)
    do{
        var token = o.next()
        if(token == undefined) break
        
        switch(token.type){
            case 'SPC': {
                if(newLine == true){
                    //newLine = false
                    lastSpace += token.text
                    lastSpaceLine = token.line
                }
            } break
            case 'NL': {
                newLine = true
            } break
            case 'TAB': {
                if(newLine == true){
                    //newLine = false
                    lastSpace += token.text
                    lastSpaceLine = token.line
                }
            } break
            case 'BLOCCLOSER': {
                newLine = false
                if(lastSpaceLine == token.line){
                    if(lastSpace.length == espaces){
                        if((espaces - 4)<0){
                            throw "Erreur exageration la fermentent non associer ligne " + token.line
                        } else
                            espaces -= 4
                    } else {
                        throw "Erreur identation ligne " + token.line
                    }
                } else if(espaces != 0){ //ils ne sont pas sur la meme ligne mais espace dif fe0
                    throw "Erreur identation du ferment ligne " + token.line
                }
            } break
            case 'BLOCOPENER': {
                newLine = false
                if(lastSpaceLine == token.line){
                    if(lastSpace.length == espaces){
                        espaces += 4
                    } else {
                        throw "Erreur identation ligne " + token.line
                    }
                } else if(espaces != 0){ //ils ne sont pas sur la meme ligne mais espace dif fe0
                    throw "Erreur identation de l'ouvrant ligne " + token.line
                }
            } break

            default: {
                if(newLine == true){
                    newLine = false
                    if(lastSpaceLine == token.line){
                        if(lastSpace.length != espaces){
                            throw "Erreur identation ligne " + token.line
                        }
                    }
                }
            }
        line = token.line
        
    } while(true)
}

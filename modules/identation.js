const moo = require('./moo.js')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const outPut = require('./stdout.js')
//let codes = require('fs').readFileSync(process.argv[2]).toString()

function print(obj) {console.log(obj)}
const identation = (identation, codes) => {
    outPut.print("VERIFICATION D'IDENTATION")
    if(identation == 'non') return
    var espaces = 0
    var tabs = 0
    var newLine = false
    var lastSpace = 0
    var lastSpaceLine = 0
    var firstIndent = 0
    var o = new itterateur.itterateur(context.context, codes)
    do{
        var token = o.next()
        if(token == undefined) break
        
        switch(token.type){
            case 'SPC': {
                if(newLine == true){
                    //newLine = false
                    lastSpace = token.text.length
                    lastSpaceLine = token.line
                    //print(lastSpace.length)
                }
            } break
            case 'NL': {
                newLine = true
            } break
            case 'TAB': {
                if(newLine == true){
                    //newLine = false
                    lastSpace = token.text.replace(/\t/g, '    ').length
                    lastSpaceLine = token.line
                    //print(token.text.replace(/\t/g, '    ').length)
                }
            } break
            case 'BLOCCLOSER': {
                newLine = false
                if((espaces-4)<0){
                    throw "Erreur surplus des ferments ligne " + token.line
                } else
                    espaces -= 4
                if(lastSpaceLine == token.line){
                    if(espaces == lastSpace){
                        //espaces -= 4
                    } else {
                        outPut.raise( "Erreur mauvaise identation ligne " + token.line )
                    }
                } else {
                    if(espaces>0){
                        outPut.raise("Erreur ligne " + token.line)
                    }
                }
                
            } break
            case 'BLOCOPENER': {
                backto:
                if(newLine == true){ //si il commence
                    newLine = false
                    if(lastSpaceLine == token.line){ //verifier si il est sur la meme ligne que la dernier espace
                        //verifier si il est sur une bonne position
                        if(lastSpace == espaces){
                            espaces += 4
                        } else { //il est a une mauvaise position
                            outPut.raise("Erreur Mauvaise identation sur la ligne " + token.line)
                        }
                    } else if(espaces == 0) {
                        espaces += 4
                    }
                } else if(newLine == false){ //si une autre a deja commence
                    espaces += 4
                }
                
            } break

            default: {
                if(token.text == 'sinon'){
                    newLine = false
                    if((espaces-4)>0){
                            espaces -= 4
                        if(lastSpace == espaces){
                        } else {
                            outPut.raise("Erreur mauvaise idenetation sur la ligne " + token.line)
                        }
                    }
                } else if(newLine == true){
                    newLine = false
                    if(lastSpaceLine == token.line){ // si sur une meme ligne que la dernier espcace
                        //print(espaces)
                        if(lastSpace == espaces){ // si sur une bonne position
                            null
                        } else {
                            //print(espaces)
                            outPut.raise("Erreur Mauvaise identattion sur la ligne " + token.line)
                        }
                    } else if(espaces != 0){ // 
                        outPut.raise("Erreur identation ligne " + token.line)
                    }
                }
            }
        }
        
    } while(true)
}


exports.identation =  identation
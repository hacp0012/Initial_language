const moo = require('./moo.js')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const outPut = require('./stdout.js')
//let codes = require('fs').readFileSync(process.argv[2]).toString()

function print(obj) {console.log(obj)}
function removeComments(codes){
    outPut.print("RETRAIT DES COMMENTAIRES")
    var o = new itterateur.itterateur(context.context, codes)
    comment = false
    line = 0
    tmp_code = ''
    
    do{
        var token = o.next()
        if(token == undefined) break
        
        if(comment == true){
            if(token.line != line){
                tmp_code += '\r\n' + token.text
                comment = false
            } else if(token.line == line){
                null
            }
        } else if(comment == false){
            if(token.type == 'COMMENTS1' || token.type == 'COMMENTS2'){
                line = token.line
                comment = true
            } else {
                tmp_code += token.text
            }
        }
        
    } while(true)
    
    return tmp_code
}

module.exports.removeComments = removeComments
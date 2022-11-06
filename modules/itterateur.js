const moo = require('./moo.js')


let context = moo.compile({
    str : {match:/[a-z ]+/},
    nl : {match: /\n/, lineBreaks: true},
    symb : /#/,
    txt : /'[a-zA-Z]+'/
})

class itterateur {
    constructor(contex, codes){
        this.tokens   = contex.reset(codes)
        this.historie = []
        this.position    = 0
    }
    
    next(){
        if(this.position == this.historie.length ){
            var tmp = this.tokens.next()
            this.historie.push(tmp)
            this.position += 1
            return tmp
        } else if(this.position < this.historie.length){
            var tmp = this.historie[this.position]
            this.position += 1
            return tmp
            
        }
    }
    back(where=2){
        this.position == 0 ?  null : this.position -= where
        //console.log(this.historie[this.position])
        return this.historie[this.position]
    }
    reset(state=0) {this.position = state}
}

exports.itterateur = {itterateur, context}
//var arr = new itterateur(context, '#prep')
//console.log(arr.next())
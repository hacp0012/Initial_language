
const moo = require('./moo.js')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const outPut = require('./stdout.js')
//let codes = require('fs').readFileSync(process.argv[2]).toString()

var codes = `#mode console

DEBUTPROGRAMME: 'demonstration sur les fonctions'
	fonction PRINCIPAL fait
		var entier a eg 0
		var entier b eg 0
		
		lire: a, "Entrer la valeur de A: ";
		native { flushInput() }
		lire: b, "Entrer la valeur de B: ";
		
		ecrire: "la valeur de A + B : ";
		console.Met( addition( a et b ) )
	ff
	
	fonction entier addition: entier a et entier b fait
		retourner a + b
	ff
	pause
FINPROGRAMME `

function print(obj) {console.log(obj)}
function defChecker(codes){
    //outPut.print("RETRAIT DES COMMENTAIRES")
    var o = new itterateur.itterateur(context.context, codes)

    print(o.next())
    print(o.next())
    //print(o.back())
    print(o.next())
    print(o.next())

}
defChecker(codes)
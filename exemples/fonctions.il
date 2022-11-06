#mode console

DEBUTPROGRAMME: 'demonstration sur les fonctions'
	fonction PRINCIPAL fait
		var entier a eg 0
		var entier b eg 0
		
		lire: a, "Entrer la valeur de A: ";

		lire: b, "Entrer la valeur de B: ";
		si a sup b alors
			a eg 3
			var entier t eg b
		fsi
		b = b.x
        var objet o = {'key':a}
        var objet arr = [1,'2',a]
		ecrire: "la valeur de A + B : ";
		console.Met( addition( a et b ) )
        var entier x eg 9
        o.key.keys['n']
		o['key']
	ff
	
	fonction entier addition: entier a et entier b fait
		retourner a + b
        var entier n eg 0
        
	ff
    fonction entier soustraction: entier a et entier b fait
		retourner a - b
        var entier n eg 0
        
	ff
	pause
FINPROGRAMME 

#mode console

DEBUTPROGRAMME: "Demonstration sur les stricture de controls"
	
	var entier x eg 6
	
	t_debut:
	ecrire: 'Entrer une valeur superieur a 5 : ';
	lire: x;
	
	si x inf 5 alors
		ecrire: "cette valeur est inferieur a 5 `n";
		allervers t_debut
	sinon alors
		//dialogue.Msg(x)
		ecrire: "BOUCLE:`n";
		boucler x fois
			ecrire: IC_index . '`n';
		fboucle
		
		ecrire: 'TANQUE:`n';
		tanq x sup 5 fait
			ecrire: IC_index . '`n';
			si IC_index eq x alors 
				halt 
			fsi
		ftanq
		
		ecrire: 'POUR:`n';
		pour index dans [1, 2, 3, 4 et 5] fait
			ecrire: index . '`n';
		fpour
	fsi
	native { console.pause() }
	
FINPROGRAMME
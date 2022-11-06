
#mode graphique
#identation non

classe famille comprend
	var entier nombre <-- 0
	var chaine nom affect ''
	
	constructeur: chaine nom et entier membres fait
		inst nombre eg membres
		inst nom = nom
	ff
	
	methode entier afficher: fait
		ecrire: inst nombre;
	ff
fclasse 

DEBUTPROGRAMME: "demonstration sur les classes"
	fonction PRINCIPAL fait
		var objet maFamille eg new famille("Eugene", 5)
		console.couleur(0x1, 0xB)
		ecrire: "Dans la famille " . maFamille.nom . ' contien ' . maFamille.nombre . ' membres.';
	//console.tableCouleurs()
	ff
	
	//pause  0
FINPROGRAMME


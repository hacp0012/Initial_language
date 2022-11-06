#mode graphique

Ctrl & Alt::
	ecrire: "vous avez appuie sur : " IC_thishotkey;
	si dialogue.msg("vous voulez ouvrire l'explorateur de fichier?",,36) eq 'Oui' alors
		lancer: 'explorer' ;
	sinon alors
		ecrire: "ok! je vous quitte.";
	fsi
retourner 
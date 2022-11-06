#mode console
#identation non

DEBUTPROGRAMME: 'DEMO'

    fonction PRINCIPAL fait
        ecrire: 'joan';
        var chaine nom eg ''
        lire:nom, 'entrer le nom: ';
        ecrire:nom;
        divers.bull('a vs!', nom)
        
        si nom dif 'joan' alors
            ecrire: "BIENVENUE Mr ";
        fsi
        boucler 5 fois
            ecrire: IC_index;
        fboucle
    ff
    
    pause, 0

FINPROGRAMME
SetWorkingDir %A_ScriptDir%
;SetWorkingDir, E:\CSIE\CODES\JC\tmpIL\exemples
;Menu, Tray, Icon , FileName
;#NoTrayIcon
#Include <LibCon> ;.ahk
#SingleInstance,Off
#Include <il_stdLib> ;.ahk
#SingleInstance Force
LibConDebug:=1SetBatchLines, -1
smartStartConsole()
console.mode := true
PRINCIPAL()

;DEBUTPROGRAMME: "demonstration sur les fonctions"
	 PRINCIPAL( ) {
		  a := 0
		  b := 0
		
		console.Lire( a, "Entrer la valeur de A: ")

		console.Lire( b, "Entrer la valeur de B: ")
		if ( a > b ) {
			a := 3
			  t := b
		}
		b := b.x
          o := {"key":a}
          arr := [1,"2",a]
		console.Met( "la valeur de A + B : ")
		console.Met( addition( a , b ) )
          x := 9
        o.key.keys["n"]
		o["key"]
	}
	
	  addition(  a ,  b ) {
		return a + b
          n := 0
        
	}
      soustraction(  a ,  b ) {
		return a - b
          n := 0
        
	}
	console.Pause(0)
;FINPROGRAMME 
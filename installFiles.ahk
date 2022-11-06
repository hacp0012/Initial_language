;#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
;SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
;SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

installationsChecker(ByRef autoHotKey, ByRef autoHotKeyLib, ByRef ahkArch, ByRef nppArch, ByRef nodeJs, ByRef notePad, ByRef tmpIl, ByRef nppAppData, ByRef ilRuner){
	
	;autoHotKey := false
	;autoHotKeyLib := false
	;ahkArch := 32
	;nppArch := 32
	;nodeJs := false
	;notePad := false
	;tmpIl := false
	;nppAppData := false

	;AUTOHOTKEY DIRRECTORE
	IfExist %A_ProgramFiles%\AutoHotkey\AutoHotkey.exe
	{
		OkAhk()
		autoHotKey = true
		ahkArch := 64
		IfExist %A_ProgramFiles%\AutoHotkey\Lib
		{
			autoHotKeyLib := true
			progBar(20)
		}
		else
		{
		}
		
	}
	else IfExist C:\Program Files (x86)\AutoHotkey\AutoHotkey.exe
	{
		OkAhk()
		autoHotKey = true
		ahkArch := 32
		IfExist C:\Program Files (x86)\AutoHotkey\Lib
		{
			;MsgBox Lib is existed
			autoHotKeyLib := true
			progBar(20)
		}
		else
		{
			;MsgBox lib isn't existed
			;FileCreateDir, C:\Program Files (x86)\AutoHotkey\Lib
		}
	}
	else
		MsgBox AHK isn't exist

	;NODEJS DIRRECTORE
	IfExist %A_ProgramFiles%\nodejs\node.exe
	{
		;LIBS
		;MsgBox node 64
		OkNode()
		nodeJs := true
		progBar(20)
	}
	else IfExist C:\Program Files (x86)\nodejs\node.exe
	{
		;LIBS
		;MsgBox node 84 is exist
		OkNode()
		nodeJs := true
		progBar(20)
	}
	;else
		;MsgBox AHK isn't exist
	;NOTEPAD DIRRECTORY
	IfExist %A_ProgramFiles%\Notepad++\notepade++.exe
	{
		;LIBS
		;MsgBox NPP 64
		OkNotepad()
		notePad := true
		progBar(20)
	}
	else IfExist C:\Program Files (x86)\Notepad++\notepad++.exe
	{
		;LIBS
		;MsgBox NPP 84
		OkNotepad()
		notePad := true
		progBar(20)
	}
	;else
		;MsgBox notepad isn't exist

	;TEMPS_IL DIR
	IfExist C:\Users\%A_UserName%\Documents\temps_IL
	{
		;MsgBox temps_IL is exist
		tmpIl := true
		progBar(5)
	}
	else
	{
		;MsgBox temps_IL isn't exist
	}
	;NPP APPDATA
	IfExist %A_AppData%\Notepad++
	{
		;MsgBox notepad appdata appdata is exist
		nppAppData := false
		progBar(5)
	}
	else
	{
		;MsgBox notepad  appdata isn't exist
	}
	
	;IL programm
	IfExist C:\Initial Language\modules\runer.exe
	{
		;MsgBox notepad appdata appdata is exist
		;nppAppData := false
		OkIl()
		progBar(25)
		ilRuner := true
		if(autoHotKey && autoHotKeyLib && nodeJs && notePad ){
			GuiControl, Disable, installer
			GuiControl, Text, annuler , Complet!
		}
	}
	else
	{
		;MsgBox runer isn't exist
	}
	


}
;MsgBox prince
installationsChecker(autoHotKey, autoHotKeyLib, ahkArch, nppArch, nodeJs, notePad, tmpIl, nppAppData, ilRuner)



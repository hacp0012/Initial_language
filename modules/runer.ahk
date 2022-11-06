
;MsgBox % A_Args.Length()
if( A_Args.Length() > 0 ){
	FileDelete, C:\Initial_Language\tmps\*.*
	;MsgBox % "cmd /c node  C:\Initial_Language\modules\main.js " . A_Args[1] . " noComp tmp"
	RunWait % "cmd /c node  C:\Initial_Language\modules\main.js " . A_Args[1] . " noComp tmp",, Hide
	
	RunWaitOne(command) {
		; WshShell object: http://msdn.microsoft.com/en-us/library/aew9yb99¬
		shell := ComObjCreate("WScript.Shell")
		; Execute a single command via cmd.exe
		exec := shell.Exec(ComSpec " " command)
		; Read and return the command's output
		return exec.StdOut.ReadAll()
	}
	;out := RunWaitOne(command)
	;MsgBox % out
	if( ErrorLevel > 0 ){
		MsgBox, 52, MESSAGE D'ERREUR, Erreur trouver!`nvoir le fichier d'erreur?
        IfMsgBox Yes
            run C:\Initial_Language\logs.log
	} else {
		;SplitPath, InputVar [, OutFileName, OutDir, OutExtension, OutNameNoExt, OutDrive]
		variable := A_Args[1]
		SplitPath, variable , OutFileName, OutDir, OutExtension, OutNameNoExt, OutDrive
		;MsgBox % OutNameNoExt
		tampo := "C:\\Initial_Language\\tmps"
		Run % "C:\\Initial_Language\\tmps\\" . OutNameNoExt . ".ahk"
	}
	;MsgBox % ErrorLevel
} else
	MsgBox % 48+262144 , ERREUR DE PARAMETRES, Aucun parametres n'ete passe au lenceur de compilation.

;cmd /c node  C:\Initial_Language\modules\main.js "A_Args[1]" noComp tmp
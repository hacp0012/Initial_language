
;HKEY_CLASSES_ROOT\initial.language
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language, , Initial_Language
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\DefaultIcon, , "C:\Initial_Language\icons\il.ico"
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell, , lancer
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\compiler, , Compiler le programme
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\compiler\command, , cmd /c node  "C:\Initial_Language\modules\main.js" "`%1" yesComp
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\editer, , Editer le programme

IfExist C:\Program Files (x86)\Notepad++\notepad++.exe
	RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\editer\command, , "C:\Program Files (x86)\Notepad++\notepad++.exe" "`%1"
else
	RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\editer\command, , "%A_ProgramFiles%\Notepad++\notepad++.exe" "`%1"

RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\lancer, , Executer le programme

IfExist C:\Program Files (x86)\AutoHotkey\AutoHotkey.exe
	RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\lancer\command, , "C:\Initial_Language\modules\runer.exe" "`%1"
else
	RegWrite, REG_SZ, HKEY_CLASSES_ROOT\initial.language\Shell\lancer\command, , "C:\Initial_Language\modules\runer.exe" "`%1"

;---------------
;HKEY_CLASSES_ROOT\.il
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\.il, , initial.language
RegWrite, REG_SZ, HKEY_CLASSES_ROOT\.il\ShellNew, FileName, C:\Initial_Language\template.txt
	
;RegDelete, HKEY_LOCAL_MACHINE\Software\SomeApplication, TestValue


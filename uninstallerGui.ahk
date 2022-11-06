﻿; Generated by AutoGUI 2.6.2

full_command_line := DllCall("GetCommandLine", "str")

if not (A_IsAdmin or RegExMatch(full_command_line, " /restart(?!\S)"))
{
    try
    {
        if A_IsCompiled
            Run *RunAs "%A_ScriptFullPath%" /restart
        else
            Run *RunAs "%A_AhkPath%" /restart "%A_ScriptFullPath%"
    }
    ExitApp
}


#SingleInstance Force
#NoEnv
SetWorkingDir %A_ScriptDir%
SetBatchLines -1

Menu Tray, Icon, shell32.dll, 33

Gui -MinimizeBox
Gui Color, White
Gui Font, s20, Courier New
Gui Add, Text, x119 y19 w219 h23 +0x200, DESINTALLEUR
Gui Font
Gui Add, GroupBox, x206 y55 w215 h173, Infos
Gui Font, s10
Gui Add, Text, x212 y81 w196 h96, si vous Desinstaller Initial_Language;`n le programme vas desintaller que IL et les autre programmes vous devrez les desintaller manuelement.
Gui Font
Gui Add, Button, vDesintallationMan gDesintallationMan x246 y197 w140 h23 +Disabled, desinstallation manuel
Gui Font, s10 Bold, Arial
Gui Add, Button, vDesinstaller gDesinstaller x231 y238 w170 h23, Desinstaller!
Gui Font
Gui Font, s14 c0xFF0000, Courier New
Gui Add, Text, x4 y237 w227 h23 +0x200, DESINTALLER INITIALL :
Gui Font
Gui Add, Picture, x-2 y44 w204 h186, C:\Initial_Language\icons\il.ico

Gui Show, w451 h270, Desintalleur IL
Return

DesintallationMan(CtrlHwnd, GuiEvent, EventInfo, ErrLevel := "") {
    run, appwiz.cpl
    ExitApp
}

Desinstaller(CtrlHwnd, GuiEvent, EventInfo, ErrLevel := "") {
    static desinstallationTerminer := false
    if(desinstallationTerminer == false)
    {
        MsgBox, 262196, Attention!, Vous etez sur de vouloir ...?
        IfMsgBox, Yes
        {
            ;#Include uninstaller.ahk
            ;DELETE KEYS FROM REGISTER
            RegDelete, HKEY_CLASSES_ROOT\initial.language
            RegDelete, HKEY_CLASSES_ROOT\.il

            ;DELETE FOLDS AND FILES
            FileRemoveDir, C:\Initial_Language , 1
            FileRemoveDir, C:\Users\%A_UserName%\Documents\temps_IL , 1
            FileRemoveDir, %A_AppData%\Notepad++ , 1
            FileMoveDir, %A_AppData%\Notepad++old, %A_AppData%\Notepad++, R
            FileDelete, C:\Program Files (x86)\Notepad++\autoCompletion\il.xml
            FileDelete, %A_ProgramFiles%\Notepad++\autoCompletion\il.xml
            
            ;***************************************
            GuiControl, Enable, DesintallationMan
            GuiControl, Text, Desinstaller , Terminer!
            desinstallationTerminer := true
            MsgBox, 64, Terminer, La desintallation du programme terminer
        }
    } else if(desinstallationTerminer == true){
        ExitApp
    }
    
}

GuiEscape:
GuiClose:
    ExitApp
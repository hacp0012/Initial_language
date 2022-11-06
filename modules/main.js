
//main laucher
//const moo = require('./moo.js')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const path = require('path')
const fs = require('fs')
const output = require('./stdout.js')
const chProc = require('child_process')
const blockChecker = require('./blockChecker.js')
const outPut = require('./stdout.js')
const simpleSyntax = require('./mainSyntaxChecker.js')

//VIDER LE FICHIER LOG
fs.writeFileSync("C:\\Initial_Language\\logs.log", "[ LOG FILE ]\n")

function main(src_path=''){
    output.print("---[ programme: " + path.parse( process.argv[2] ).name + " ]---")
    
    //POUR IMPORTER LES FICHIERS DEPUIS LA SOURCES
    if(src_path != ''){
        //VIDER LE FICHIER LOG
        fs.writeFileSync("C:\\Initial_Language\\logs.log", "[ LOG FILE ]\n")
        fs.writeFileSync("C:\\Initial_Language\\configs\\dest.path", src_path)
        blockChecker(src_path)
        //simpleSyntax(src_path)
    } else {
        blockChecker(process.argv[2])
        //simpleSyntax(process.argv[2])
    }
    
    //APPELER LE TRADUCTEUR ET L'IDENTEUR
    require('./translater.js')
    output.print("PROGRAMME : " + path.parse( process.argv[2] ).name + ".il TRADUIT AVEC SUCCES!")
}

function compilate(){
    //CAN TAKE PARAMS
    // C:\Program Files\AutoHotkey\Compiler\Ahk2Exe.exe /in "$(FULL_CURRENT_PATH)" /out "$(CURRENT_DIRECTORY)\compiled\$(FILE_NAME).exe"  /icon "E:\CSIE\CODES\JC\uc\icons\ic.ico"
    var arg = path.parse( process.argv[2] )
    const cmd = `"C:\\Program Files\\AutoHotkey\\Compiler\\Ahk2Exe.exe" /in "${arg.dir + "\\" + arg.name + ".ahk"}" /icon "C:\\Initial_Language\\icons\\Setup.ico"`
    //output.print(cmd)
    var compilationStat = true
    chProc.exec( cmd , (error, stdout, stderr) => {
        if (error) {
            output.print(error)
            compilationStat = false
            return
        } else {
            compilationStat = false
            return
        }
    })
    return compilationStat
}


if(require.main === module){
    fs.writeFileSync("C:\\Initial_Language\\configs\\dest.path", process.argv[2])
    main()
    
    //COMPILLATION
    if(process.argv[3] != null){
        if(process.argv[3] == 'noComp'){
            output.print('\nPROGRAMME NON COMPILER\n')
        } else if(process.argv[3] == 'yesComp'){
            if(compilate()){
                output.print("PROGRAMME : " + path.parse( process.argv[2] ).name + " COMPILER AVEC SUCCES!")
            }
        }
    }
}

exports.main = main
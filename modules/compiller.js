fs.rmdirSync('../temps', true)
fs.mkdirSync('../temps')
fs.copyFileSync('../LibCon_Class/LibCon.ahk', '../temps')
fs.copyFileSync('../libs/ic_stdLib.ahk', '../temps')

function pathArgv(){ //parser le nom du fichier 
    var arg = path.parse(process.argv[2])
    return "..\\tmps\\" + arg.name + ".ahk"
}

child_process.exec(`C:\Program Files\AutoHotkey\Compiler\Ahk2Exe.exe ${
                   path.parse(process.argv[2]).dir + '\\' + path.parse(process.argv[2]).name + '.exe'
                   }`, {}, (e)=>{})

require('fs').writeFileSync(path.parse(process.argv[2]).dir + '\\' + path.parse(process.argv[2]).name + '.ahk', arrangeur())
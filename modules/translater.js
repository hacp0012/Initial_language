const moo = require('./moo.js')
const path = require('path')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const identation = require('./identation.js')
const rmComments = require('./removeComments.js')
const simpleSyntax = require('./mainSyntaxChecker.js')
let codes = require('fs').readFileSync( require('fs').readFileSync("C:\\Initial_Language\\configs\\dest.path").toString() ).toString()

//get preprocessors
//mod all comments
//get all natives
//get all str
//mod all DEBUT & FINPROGRAMMME
//translate 

function print(obj) {console.log(obj)}

//recuperer les blocks natives
function nativeBloc(cds=codes, blst=[]){
    //get
    var codes = cds
    var natList = codes.match(/native *{/g)
    if(blst[0]==undefined)
        if(natList==null) return [codes]
    var natIndex = []
    var natBlocksList = blst
    
        //replace
        if(blst[0]!=undefined){
            for(index in blst){
                codes = codes.replace(`<$n:${index}$>`, blst[index].slice(1, blst[index].length-1))
            }
            return [codes]
        }
    
    //get
    for(value of natList){
        natIndex.push(codes.indexOf(value))
    }
    for(index in natIndex){
        var startPos = natIndex[index]+natList[index].length-1
        var brace = 1
        var content = '' //natList[index]
        do{
            if(codes[startPos]=='}'){
                brace--
                content += codes[startPos]
                if(brace==0)break
                startPos++
            } else{
                content += codes[startPos]
                startPos++
            }
        }while(true)
        natBlocksList.push(content)
    }
    //replace
    for(index in natBlocksList){
        codes = codes.replace(natBlocksList[index], `<$n:${index}$>`)
    }
    return [codes, natBlocksList]
    //print(natBlocksList)
}


var preprocessor_mode = 'console'
var preprocessor_identation = 'oui'
var preprocessor_fileList = [] //fichier a importer au format IC
var preprocessor_fnPrincipal = ''

function getProprocessors(){
    //get
    var proprocessors = []
    try{
        proprocessors.push(codes.match(/# *mode[ \t]+(console|graphique)/)[0])
        if(proprocessors[proprocessors.length-1].indexOf('graphique')>0){
            preprocessor_mode = 'graphique'
        }
    } catch(err){
        null
    }
    try{
        proprocessors.push(codes.match(/# *identation[ \t]+(oui|non)/)[0])
        if(proprocessors[proprocessors.length-1].indexOf('non')>0){
            preprocessor_identation = 'non'
        }
    } catch (err){
        null
    }
    try{
        var importList = codes.match(/# *importer[ \t]+"[^"]+"/g)
        for(value of importList){
             preprocessor_fileList.push(value.match(/"([^"]+)"/)[0].replace(/"/g, ''))
            proprocessors.push(value)
        }
    } catch(err){
        null
    }
    if(proprocessors==null) return []
    //remove
    for(value of proprocessors){
        codes = codes.replace(value, '')
    }
    //return proprocessors
}

//RECUPERER LES PREPROCESSEURS
getProprocessors(codes)

//RETIRE LES COMMANTAIRES
codes = rmComments.removeComments(codes)

//RETIRE LES BLOCS NATIVES
var codesP = nativeBloc(codes)
codes = codesP[0]
//print(codes)

//appeler LE VERIFICATEUR DE L'INDENTATION des lignes
identation.identation(preprocessor_identation, codes)

//VERIFIER LES SYNTAX SIMPLE
simpleSyntax(require('fs').readFileSync("C:\\Initial_Language\\configs\\dest.path").toString())

var o = new itterateur.itterateur(context.context, codes)

function translator2(){
    let context = []
    /*
    context opener : si, pour, tanq, boucler, fonction, classe
    context closer : alors, fait, fois, comprend, contien
    */
    let tmpCodes = ''
    do{
        var token = o.next()
        if(token == undefined)break
        switch(token.type){
            case 'COMMENTS1':{
                tmpCodes += token.text.replace('//', ';')
            } break
            case 'COMMENTS2':{
                tmpCodes += ';'+token.text
            } break
            case 'STRINGS1': {
                tmpCodes += token.text
            } break
            case 'STRINGS2': {
                var tmp = token.text.slice(1, token.text.length-1)
                tmp = '"' + tmp.replace(/"/g, '`"') + '"'
                tmpCodes += tmp.replace(/`'/g, "'")
            } break
            case 'SUPERVAR': {
                tmpCodes += token.text.replace('IC_', 'A_')
            } break
            case 'SYMBOLS1': {
                tmpCodes += token.text
            } break
            case 'OBJECTINIT': {
                //if fn
                if(context[context.length-1] == 'fonction'){
                    tmpCodes += '('
                } else if(context[context.length-1] == 'lire'){
                    tmpCodes += '('
                } else if(context[context.length-1] == 'ecrire'){
                    tmpCodes += '('
                } else if(context[context.length-1] == 'ecrirel'){
                    tmpCodes += '('
                } else if(context[context.length-1] == 'lancer'){
                    //print(context)
                    tmpCodes += '('
                } else {
                    tmpCodes += token.text
                }
            } break //for chek
            case 'KW': {
                //'local', 'halt', 'retourner', 'PRINCIPAL', 'inst', 'dans', 'herite', 'native'
                switch(token.text){
                    case '<==':{
                        tmpCodes += 'return'
                    } break
                    case 'local':{
                        tmpCodes += 'static'
                    } break
                    case 'halt':{
                        tmpCodes += 'break'
                    } break
                    case 'retourner':{
                        tmpCodes += 'return'
                    } break
                    case 'PRINCIPAL':{
                        tmpCodes += 'PRINCIPAL('
                        preprocessor_fnPrincipal = 'principal'
                        //print(preprocessor_fnPrincipal)
                    } break
                    case 'inst':{
                        tmpCodes += 'this.'
                        o.next() //pour enleve lespace entre les deux valeurs et concatener this.valeur
                    } break
                    case 'dans':{
                        tmpCodes += 'in'
                    } break
                    case 'herite':{
                        tmpCodes += 'extend'
                    } break
                    case 'lire':{
                        tmpCodes += 'console.Lire'
                        context.push('lire')
                    } break
                    case 'ecrire':{
                        tmpCodes += 'console.Met'
                        context.push('ecrire')
                    } break
                    case 'ecrirel':{
                        tmpCodes += 'console.Ecrire'
                        context.push('ecrirel')
                    } break
                    case 'parRef':{
                        tmpCodes += 'ByRef'
                    } break
                    case 'finApp':{
                        tmpCodes += 'ExitApp'
                    } break
                    case 'allervers':{
                        tmpCodes += 'goto'
                    } break
                    case 'lancer':{
                        tmpCodes += 'divers.Lancer'
                        context.push('lancer')
                    } break
                    case 'arreter':{
                        tmpCodes += 'return'
                    } break
                    case 'pause':{
                        if(preprocessor_mode=='console'){
                            tmpCodes += 'console.Pause(0)' //pas de messages...
                        } else if(preprocessor_mode=='graphique'){
                            tmpCodes += 'sleep, '
                        }
                    } break
                    
                }
            } break
            case 'TYPES': {
                //'entier', 'chaine', 'reel', 'objet'
                switch(token.text){
                    case 'entier':{
                        //context.push('')
                        tmpCodes += ''
                    } break
                    default :
                        tmpCodes += ''
                }  
                
            } break
            case 'CONDITIONNEL': {
                //'Et', 'Ou', 'Non', 'eq', 'sup', 'inf', 'dif'
                switch(token.text){
                    case 'Et':{
                        tmpCodes += '&'
                    } break
                    case 'Ou':{
                        tmpCodes += '||'
                    } break
                    case 'Non':{
                        tmpCodes += '!='
                    } break
                    case 'eq':{
                        tmpCodes += '='
                    } break
                    case 'sup':{
                        tmpCodes += '>'
                    } break
                    case 'inf':{
                        tmpCodes += '<'
                    } break
                    case 'dif':{
                        tmpCodes += '!='
                    } break
                    default :
                        tmpCodes += token.text //pour les symboles deja bien definie
                }
            } break
            case 'AFFECTATION': {
                //'<--', '=', 'eg', 'affect'
                switch(token.text){
                    case '<--':{
                        tmpCodes += ':='
                    } break
                    case '=':{
                        tmpCodes += ':='
                    } break
                    case 'eg':{
                        tmpCodes += ':='
                    } break
                    case 'affect':{
                        tmpCodes += ':='
                    } break
                }
            } break
            case 'ARITHMETIQUE': {
                tmpCodes += token.text
            } break //for chek
            case 'ENDINST': {
                //';', 'finst'
                switch(token.text){
                    case ';':{
                        if(context[context.length-1] == 'lire'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'ecrire'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'ecrirel'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'lancer'){
                            tmpCodes += ')'
                            context.pop()
                        } else
                            tmpCodes += ''
                    } break
                    case 'finst':{
                        if(context[context.length-1] == 'lire'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'ecrire'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'ecrirel'){
                            tmpCodes += ')'
                            context.pop()
                        } else if(context[context.length-1] == 'lancer'){
                            tmpCodes += ')'
                            context.pop()
                        } else
                            tmpCodes += ''
                    } break
                }
            } break
            case 'IDENTIFIANTS': {
                tmpCodes += token.text
            } break //for chek
            case 'BOOLEENE': {
                switch(token.text){
                    case 'vrais':{
                        tmpCodes += 'true'
                    } break
                    case 'faut':{
                        tmpCodes += 'false'
                    }
                }
            } break
            case 'INSTSEP': {
                switch(token.text){
                    case ',':{
                        tmpCodes += token.text
                    } break
                    case 'et':{
                        tmpCodes += ','
                    }
                }
            } break
            case 'BLOCOPENER': {
                //'alors', 'fait', 'contien', 'comprend', 'DEBUT', fois, DEBUTPROGRAMME
                switch(token.text){
                    case 'alors':{
                        if(context[context.length-1] == 'si'){
                            tmpCodes += ') {'
                            context.pop()
                        } else {
                            tmpCodes += '{'
                        }
                    } break
                    case 'fait':{
                        //if fn
                        if(context[context.length-1] == 'fonction'){
                            tmpCodes += ') {'
                            context.pop()
                        } else {
                            tmpCodes += '{'
                        }
                    } break //for check
                    case 'contien':{
                        tmpCodes += '{'
                    } break
                    case 'comprend':{
                        tmpCodes += '{'
                    } break
                    case 'DEBUT':{
                        tmpCodes += '{'
                    } break
                    case 'fois':{
                        tmpCodes += '{'
                    } break
                    case 'DEBUTPROGRAMME':{
                        tmpCodes += ';'+token.text
                    } break
                }
            } break
            case 'BLOCCLOSER': {
                //'fsi', 'ff', 'fboucle', 'fpour', 'ftanq', 'fclasse', FIN, FINPROGRAMME
                switch(token.text){
                    case 'fsi':{
                        tmpCodes += '}'
                    } break
                    case 'ff':{
                        tmpCodes += '}'
                    } break
                    case 'fboucle':{
                        tmpCodes += '}'
                    } break
                    case 'fpour':{
                        tmpCodes += '}'
                    } break
                    case 'ftanq':{
                        tmpCodes += '}'
                    } break
                    case 'fclasse':{
                        tmpCodes += '}'
                    } break
                    case 'FINPROGRAMME':{
                        tmpCodes += ';'+token.text
                    } break
                    case 'FIN':{
                        tmpCodes += '}'
                    } break
                }
            } break
            case 'siDef': {
                context.push('si')
                tmpCodes += 'if ('
            } break
            case 'siNonDef': {
                tmpCodes += '} else'
            } break
            case 'pourDef':{
                tmpCodes += 'for'
            } break
            case 'boucleDef': {
                tmpCodes += 'loop % '
            } break
            case 'classeDef':{
                tmpCodes += 'class'
            } break
            case 'varDef':{
                tmpCodes += ''
            } break
            case 'methodeDef':{
                tmpCodes += ''
                context.push('fonction')
            } break //for chek
            case 'fonctionDef': {
                tmpCodes += ''
                context.push('fonction')
            } break
            case 'nativeDef': {
                tmpCodes += ''
            } break //for verify
            case 'tanqDef':{
                tmpCodes += 'while'
            } break
            case 'jusquaDef':{
                tmpCodes += '} until'
            } break
            case 'constructeurDef':{
                tmpCodes += '__New'
                context.push('fonction')
            } break
            case 'SPC':{
                tmpCodes += token.text
                //print(new RegExp( token.text ).test('\r\n'))
                //context.push('fonction')
            } break
            case 'NL':{
                tmpCodes += token.text
                //print(new RegExp( token.text ).test('\r\n'))
                //context.push('fonction')
            } break
            default:
                tmpCodes += token.text
        }
    }while(true)
    return nativeBloc(tmpCodes, codesP[1])[0]
    //return tmpCodes
}

function arrangeur(){
    var preprocessors = ["SetWorkingDir %A_ScriptDir%",
                         process.argv[4] == "tmp" ? `SetWorkingDir, ${path.parse(process.argv[2]).dir}` : `;SetWorkingDir, ${path.parse(process.argv[2]).dir}`,
                         process.argv[4] == "tmp" ? "Menu, Tray, Icon , C:\\Initial_Language\\icons\\il.ico" : ";Menu, Tray, Icon , FileName",
                         ';#NoTrayIcon',
                         '#Include <LibCon> ;.ahk',
                         '#SingleInstance,Off',
                         '#Include <il_stdLib> ;.ahk',
                         '#SingleInstance Force'
                        ]
    var sampleCodes = ['LibConDebug:=1SetBatchLines, -1']
    if(preprocessor_mode=='console') sampleCodes.push('smartStartConsole()')
    if(preprocessor_mode=='console'){
        sampleCodes.push("console.mode := true")
    }

//    sampleCodes.push(`try {
//    PRINCIPAL() ;run the main programm before!
//}`)
    var codes = translator2()
    if(preprocessor_fnPrincipal=='principal') sampleCodes.push("PRINCIPAL()") //DOIT TOUJOUR ETRE LE DERNIER SUR LA LISTE
    
    //-----
    codes = sampleCodes.join('\n') + codes
    codes = '\n' + codes
    codes = preprocessors.join('\n') + codes
    return codes
}

function pathArgv(){ //parser le nom du fichier 
    var arg = path.parse( require('fs').readFileSync("C:\\Initial_Language\\configs\\dest.path").toString() )
    
    if(process.argv[4] == "tmp")
        return "C:\\Initial_Language\\tmps" + "\\" + arg.name + ".ahk"
    else
        return arg.dir + "\\" + arg.name + ".ahk"
}
//print(process.argv[2])





require('fs').writeFileSync(pathArgv(), arrangeur())
//arrangeur()

    
    

//const fsf = require('fs')
//
//
//fsf.rmdirSync('..\\temps', {recursive:true})
//fsf.mkdirSync('..\\temps')
//fsf.copyFileSync('..\\LibCon_Class\\LibCon.ahk', '..\\temps')
//fsf.copyFileSync('..\\libs\\ic_stdLib.ahk', '..\\temps')
//
//function pathArgvs(){ //parser le nom du fichier 
//    var arg = path.parse(process.argv[2])
//    return "..\\tmps\\" + arg.name + ".ahk"
//}
//print(path.parse(process.argv[2]).dir + '\\' + path.parse(process.argv[2]).name + '.ahk')
//child_process.exec(`C:\Program Files\AutoHotkey\Compiler\Ahk2Exe.exe ${
//                   path.parse(process.argv[2]).dir + '\\' + path.parse(process.argv[2]).name + '.exe'
//                   }`, {}, (e)=>{})

//require('fs').writeFileSync(path.parse(process.argv[2]).dir + '\\' + path.parse(process.argv[2]).name + '.ahk', arrangeur())



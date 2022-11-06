const moo = require('./moo.js')
const {itterateur} = require('./itterateur.js')
const {context} = require('./context.js')
const outPut = require('./stdout.js')
let codes = require('fs').readFileSync("E:\\CSIE\\CODES\\JC\\uc\\exmples\\fonctions.il").toString()


function print(obj) {console.log(obj)}
var laxer = context.context.reset(codes)

function checkNext(){
    var save = laxer.save()
    var t = laxer.next()
    laxer.reset(codes, save)
    laxer.next()
    return t
}

//class object : o.className
//onject array : o*

//f1/principal/a
//f1/principal/b
//f1/principal/s1/t
//f1/principal/x
//f1/principal/o*
//f2/addition
//f2/addition/a
//f2/addition/b

//f1/principal/a
//f1/principal/b
//f1/principal/a
//f1/principal/b
//f1/principal/a.
//f1/principal/b.
//f1/principal/s1/a
//f1/principal/s1/b
//f1/principal/b
//f1/principal/addition
//f1/principal/a
//f1/principal/b
//f1/principal/o.key
//f1/principal/o
//f2/addition
//f2/addition/a
//f2/addition/b

function defChecker(){
    var isFunc = false
    var isFuncNameFisrt = false
    var funcN = 0
    var isCtrl = false
    var ctrlN = 0
    var isVar = false
    var decTab = []
    var decTabAddress = []
    var codes = ""
    while(true){
        var o = laxer.next()
        if(o == undefined) break
        //DECLARATION
        switch(o.type){
            case 'fonctionDef':{
                isFunc = true
                isFuncNameFisrt = true
                funcN++
                decTab.pop()
                decTab.push('f'+funcN+'/')
                codes+=o.text
            } break
            case 'varDef':{
                isVar = true
            } break
            case 'IDENTIFIANTS':{
                if(isVar==true){
                    isVar = false
                    decTabAddress.push(decTab.join('')+o.text+'/')
                } else if(isFunc){
                    //isFunc=false
                    if(isFuncNameFisrt){
                        decTab.push(o.text+'/')
                        isFuncNameFisrt = false
                    }
                    decTabAddress.push(decTab.join('')+o.text+'/')
                } else{
                    codes+=o.text
                }
            } break
            case 'KW':{
                if(o.text=='PRINCIPAL'){
                    isFunc=false
                    decTab.push(o.text+'/')
                } else{
                    codes+=o.text
                }
            } break
            case 'BLOCCLOSER':{
                decTab.pop()
            } break
            case 'siDef':{
                ctrlN++
                decTab.push('c'+ctrlN+'/')
                codes+=o.text
                
            } break
            case 'BLOCOPENER':{
                if(o.text=='fait'){
                    if(isFunc){
                        isFunc=false
                    }
                }
            } break
            case '':{} break
            default:{
                codes+=o.text
            }
        }
        
    }
    //---------------------------------------------------------------------------------------------
//    print(codes)
    laxer = context.context.reset(codes)
    isFunc = false
    isFuncNameFisrt = false
    funcN = 0
    isCtrl = false
    ctrlN = 0
    isVar = false
    decTab = []
    decTabAddress = []
    decTab = []
    var codes2 = ''
    var objectDot = false
    //print(laxer.next())
    while(true){
        var o = laxer.next()
        if(o == undefined) break
        print(1)
//        break
        //SUPRIMMER LES OBJETS
        switch(o.type){
            case 'fonctionDef':{
                //print()
                isFunc = true
                isFuncNameFisrt = true
                funcN++
                decTab.pop()
                decTab.push('f'+funcN+'/')
                codes+=o.text
            } break
            case 'siDef':{
                ctrlN++
                decTab.push('c'+ctrlN+'/')
                codes+=o.text
                
            } break
            case 'BLOCCLOSER':{
                decTab.pop()
            } break
            case 'BLOCOPENER':{
                if(o.text=='fait'){
                    if(isFunc){
                        isFunc=false
                    }
                }
            } break
            case "IDENTIFIANTS":{
                if(objectDot==false){
                    decTabAddress.push(decTab.join('')+o.text+'/')
                }
                var nxt = checkNext()
                if(nxt.text=='.'){
                    objectDot=true
                }
            } break
            case "IDENTIFIANTS":{} break
            default:{
                objectDot=false
                codes2+=o.text
            }
        }
    }
    
    print(decTabAddress)
//    print(codes2)
//    print('alors/puis/1cool/cool/1cool/'.replace(/cool\/[^a-z]?/, ''))

}
defChecker()

const fs = require('fs')

class output{
    constructor(){
        
    }
    
    print(...param){
        console.log.apply(null, param)
        fs.appendFileSync("C:\\Initial_Language\\logs.log", '\n' + JSON.stringify(param))
    }
    raise(...msg){
        this.print.apply(msg)
        fs.appendFileSync("C:\\Initial_Language\\logs.log", '\n' + JSON.stringify(msg))
        throw msg
    }
}

module.exports = new output()

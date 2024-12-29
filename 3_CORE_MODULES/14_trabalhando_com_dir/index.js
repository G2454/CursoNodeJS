const fs = require('fs')

if(!fs.existsSync('./minhaPasta')){
    console.log("Não Existe")
    fs.mkdirSync('minhaPasta')
}else if((fs.existsSync('./minhaPasta'))){
 console.log("Existe!")
}


const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req, res) =>{
    fs.readFile('message.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return
    })
})

server.listen(port,()=>{
    console.log(`Servidor Web rodando na porta ${port}`)
})
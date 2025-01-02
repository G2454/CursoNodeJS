import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next){
    req.authStatus = false
    if(req.authStatus){
        console.log('User is authenticated')
        next()
}else{
    console.log('User is not authenticated')
    next()

}
}


app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'))
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
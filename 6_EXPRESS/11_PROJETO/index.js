import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
import router from './users/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = 5000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/users', router);

app.use(express.static('public'))

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'))
})

app.get('/contato', (req, res) => {
    res.sendFile(`${basePath}/contatos.html`)
})

app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
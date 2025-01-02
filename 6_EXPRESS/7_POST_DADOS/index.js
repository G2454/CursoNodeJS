import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
 })

 app.post('/users/save', (req, res) => {
    //console.log(req.body)
    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e a sua idade é ${age}`)
    res.sendFile(`${basePath}/userform.html`)
 })

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log("id", id)  
})


app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'))
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
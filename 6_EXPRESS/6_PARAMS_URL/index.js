import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'index.html'))
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    console.log("id", id)  
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router()

 const basePath = path.join(__dirname, '../templates');

 
router.get('/add', (_, res) => {
    res.sendFile(`${basePath}/userform.html`);
});



router.post('/save', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    console.log(`O nome do usuário é ${name} e a sua idade é ${age}`);
    res.sendFile(path.join(basePath, 'userform.html'));
});


 router.get('/:id', (req, _) => {
    const id = req.params.id
    console.log("id", id)  
})

export default router
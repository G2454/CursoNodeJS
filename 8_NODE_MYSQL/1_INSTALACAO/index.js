import express from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password',
    database: 'curso',
})

conn.connect((err) => {
    if(err){
        console.log(err)
        return
    }
    console.log('Conectado ao banco de dados')
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000')
    })
})

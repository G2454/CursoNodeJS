import express, { query } from 'express'
import exphbs from 'express-handlebars'
import mysql from 'mysql'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})



app.use('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(query, (err, result) => {
        if(err){
            console.log(err)
            return
        }
        console.log(`O Livro ${title} com ${pageqty} páginas foi inserido com sucesso`)
        res.redirect('/books')
    })
})

app.use('/books', (req, res) => {
    const query = 'SELECT * FROM books'

    conn.query(query, (err, result) => {
        if(err){
            console.log(err)
            return
        }
        const books = result

        res.render('books', {books})

    })
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

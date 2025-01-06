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

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

    conn.query(query, (err, result) => {
        if(err){
            console.log(err)
            return
        }
        console.log(`O Livro ${title} com ${pageqty} páginas foi atualizado com sucesso`)
        res.redirect('/books')
    })
})
 


app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, (err, result) => {
        if(err){
            console.log(err)
            return
        }
        const book = result[0]

        res.render('editbook', {book})
    })

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

app.use('/book/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, (err, result) => {
        if(err){
            console.log(err)
            return
        }
        const book = result[0]

        res.render('book', {book})
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

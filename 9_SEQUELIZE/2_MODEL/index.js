import express, { query } from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import User from './models/User.js'

const app = express()

const user = User

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

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}).catch((err) => {
    console.log(err)
})



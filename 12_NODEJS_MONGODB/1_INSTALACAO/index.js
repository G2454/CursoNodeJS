import express from 'express'
import exphbs from 'express-handlebars'
import client from './db/conn.js'

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

app.listen(3000)
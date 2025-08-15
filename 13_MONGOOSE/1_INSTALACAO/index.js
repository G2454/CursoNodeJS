import express from 'express'
import exphbs from 'express-handlebars'
import client from './db/conn.js'
import productRoutes from './routes/productRoutes.js'
import { engine } from 'express-handlebars' // Import correctly

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', engine({ 
    defaultLayout: 'main', 
    partialsDir: ['views/partials'] 
}))
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)


app.use(express.json())

app.use(express.static('public'))

app.use('/products', productRoutes)

app.listen(3000)
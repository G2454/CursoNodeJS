import exphbs from 'express-handlebars'
import express from 'express'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
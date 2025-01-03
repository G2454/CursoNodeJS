import exphbs from 'express-handlebars'
import express from 'express'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.get('/dashboard', (req, res) =>{
    const items = [
        "item 1",
        "item 2",
        "item 3",
        "item 4",
        "item 5",
        "item 6",
        "item 7",
        "item 8",
        "item 9",
        "item 10"
    ]
    res.render('dashboard', {items})
})

app.get('/', (req, res) => {
    const user = { 
        name : 'John',
        surname : 'Doe'
    }

    const palavraSecreta = '123456'
    
    const auth = true

    const approved = false

    res.render('home', {user: user, palavraSecreta, auth, approved})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
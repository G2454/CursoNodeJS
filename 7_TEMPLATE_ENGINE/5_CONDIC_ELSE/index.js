import exphbs from 'express-handlebars'
import express from 'express'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.get('/dashboard', (req, res) =>{
    res.render('dashboard')
})

app.get('/', (req, res) => {
    const user = { 
        name : 'John',
        surname : 'Doe'
    }

    const palavraSecreta = '123456'
    
    const auth = false

    const approved = false

    res.render('home', {user: user, palavraSecreta, auth, approved})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
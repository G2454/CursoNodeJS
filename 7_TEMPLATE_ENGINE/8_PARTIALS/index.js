import exphbs from 'express-handlebars'
import express from 'express'

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/blog', (req, res) => {
    const posts = [
        {title: 'Post 1', body: 'This is post 1', category: 'NodeJS', comments:5},
        {title: 'Post 2', body: 'This is post 2', category: 'PHP', comments:2},
        {title: 'Post 3', body: 'This is post 3', category: 'HTML', comments:6},
        {title: 'Post 4', body: 'This is post 4', category: 'ML', comments:9},
    ]
    res.render('blog', {posts})
})

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

app.get('/post', (req, res) =>{
    const post = {
        title: 'Aprender NodeJS',
        category: 'Javascript',
        body: 'Este artigo vai te ajudar a aprender javascript',
        comments: "4"
    }
    res.render('blogpost', {post})
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
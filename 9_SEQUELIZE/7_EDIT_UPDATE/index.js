import express from 'express'
import exphbs from 'express-handlebars'
import conn from './db/conn.js'
import User from './models/User.js'
import { raw } from 'mysql'
import { where } from 'sequelize'

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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})



app.post('/user/delete/:id', async (req, res)=>{
    const id = req.params.id
    await User.destroy({where:{id:id}})
    res.redirect('/')
    
})
app.get('/users/edit/:id', async(req, res)=>{
    const id = req.params.id

    const user = await User.findOne({raw:true,where: {id: id}})

    res.render('useredit', {user})
})

app.post('/users/update', async(req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {where: {id:id}})

    res.redirect('/')

})

app.post('/user/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    }

    await user.create({
        name: name,
        occupation: occupation,
        newsletter: newsletter
    })

    res.redirect('/')

})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({where: {id: id}, raw: true})

    res.render('userview', {user})
})


app.get('/', async (req,res) => {
    
    const users = await user.findAll({raw: true})

    console.log(users)
    res.render('home', {users})
})


conn.sync()
/*.sync({force: true}) */
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}).catch((err) => {
    console.log(err)
})



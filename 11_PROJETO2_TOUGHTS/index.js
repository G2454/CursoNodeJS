import express from 'express'
import { engine } from 'express-handlebars' // Import correctly
import session from 'express-session'
import FileStore from 'session-file-store'
import flash from 'express-flash'
import conn from './db/conn.js'
import path from 'path'
import os from 'os'
import User from './models/User.js'
import Tought from './models/Tought.js'
import router from './routes/toughtsRoutes.js'
import authrouter from './routes/authRoutes.js'
import ToughtsController from './controllers/ToughtsController.js'
import AuthController from './controllers/AuthController.js'

const app = express()

const connection = conn

const storage = FileStore(session)

const user = User

const tought = Tought

const toughtRoutes = router

const authRouter = authrouter

const toughtController = ToughtsController

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

app.use(
    session({
        name:'session',
        secret:'nosso_secret',
        resave: false,
        saveUninitialized:false,
        store: new storage({
            logFn: function(){},
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie:{
            secure:false,
            maxAge:360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)


app.use(flash())

app.use(express.static('public'))

app.use((req, res, next)=>{
    if(req.session.userId){
        res.locals.session = req.session
    }
    next()
})

app.use(express.json())

app.use('/toughts', toughtRoutes)

app.use('/', authRouter)

app.get('/', toughtController.showToughts)

conn.sync().then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err))

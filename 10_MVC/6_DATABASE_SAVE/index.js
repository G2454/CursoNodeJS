import express from 'express'
import { engine } from 'express-handlebars' // Import correctly
import conn from './db/conn.js'
import Task from './models/Task.js'
import router from './routes/taskRoutes.js'

const app = express()

const task = Task

const taskRoutes = router

app.engine('handlebars', engine({ 
    defaultLayout: 'main', 
    partialsDir: ['views/partials'] 
})) // Register express-handlebars

app.set("views", "./views");
app.set("view engine", "handlebars");


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use('/tasks', router)
app.use(express.json())
app.use(express.static('public'))

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})
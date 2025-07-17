import express from 'express'
import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

AuthRouter.get('/login', AuthController.login)
AuthRouter.post('/login', AuthController.loginPost)
AuthRouter.get('/register', AuthController.register)
AuthRouter.post('/register', AuthController.registerPost)
AuthRouter.get('/logout', AuthController.logout)

export default AuthRouter
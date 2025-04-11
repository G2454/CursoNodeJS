import express from 'express'
import AuthController from '../controllers/AuthController.js'

const AuthRouter = express.Router()

AuthRouter.get('/login', AuthController.login)
AuthRouter.get('/register', AuthController.register)

export default AuthRouter
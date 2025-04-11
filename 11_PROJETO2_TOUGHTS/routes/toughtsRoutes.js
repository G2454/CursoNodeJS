import express from 'express'
import ToughtsController from '../controllers/ToughtsController.js'

const router = express.Router()



router.get('/', ToughtsController.showToughts)

export default router
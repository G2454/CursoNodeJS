import express from 'express'
import ToughtsController from '../controllers/ToughtsController.js'
import checkAuth from '../helpers/auth.js'

const router = express.Router()

router.post('/add', checkAuth, ToughtsController.createToughtSave)
router.get('/add', checkAuth, ToughtsController.createTought)
router.get('/edit/:id', checkAuth, ToughtsController.updateTought)
router.post('/edit', checkAuth, ToughtsController.updateToughtSave)
router.get('/', ToughtsController.showToughts)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)

export default router
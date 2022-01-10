import express from 'express'
import UserController from '../controllers/userController'
const router = express.Router()

router.get('/sign-up', UserController.signUp)

export default router

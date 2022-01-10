import express from 'express'
import UserController from '../controllers/userController'
const router = express.Router()

router.post('/user/sign-up', UserController.signUp)

router.post('/user/login', UserController.login)

export default router

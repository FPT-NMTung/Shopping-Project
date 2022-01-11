import express from 'express'
import UserController from '../controllers/userController'
const router = express.Router()

router.post('/user/sign-up', UserController.signUp)

router.post('/user/login', UserController.login)

router.post('/user/active', UserController.active)

export default router

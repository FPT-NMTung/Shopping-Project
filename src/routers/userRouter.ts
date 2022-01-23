import express from 'express'
import UserController from '../controllers/userController'
const router = express.Router()

router.post('/user/sign-up', UserController.signUp)

router.post('/user/login', UserController.login)

router.post('/user/active', UserController.active)

router.get('/user/get-all',UserController.getAll)

export default router

import express from 'express'
import UserController from '../controllers/userController'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.post('/user/sign-up', UserController.signUp)

router.post('/user/login', UserController.login)

router.post('/user/active', UserController.active)

router.post('/user/change-password', AuthorizationRouter, UserController.changePassword)

router.get('/user/get-user-info', UserController.getInformation)

export default router

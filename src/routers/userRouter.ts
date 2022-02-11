import express from 'express'
import UserController from '../controllers/userController'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.post('/user/sign-up', UserController.signUp)

router.post('/user/login', UserController.login)

router.patch('/user/active', AuthorizationRouter, UserController.active)

router.patch('/user/change-password', AuthorizationRouter, UserController.changePassword)

router.get('/user/get-user-info', UserController.getInformation)

router.post('/user/send-email-forgot-password', UserController.sendEmailForgotPassword)

router.patch('/user/reset-password', UserController.changePasswordByCodeForgotPassword)

router.put('/user/update-information', AuthorizationRouter, UserController.updateInformation)

router.post('/user/send-email-active-account', AuthorizationRouter, UserController.sendEmailVerifyAccount)

export default router

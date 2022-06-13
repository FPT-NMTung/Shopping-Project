import express from 'express'
import TestController from '../controllers/testController'
const router = express.Router()

router.post('/test/send-email', TestController.sendEmail)

router.post('/test/send-email-bill', TestController.sendEmailBill)

router.post('/test/send-code-active', TestController.sendMailActive)

router.post('/test/data', TestController.test)

export default router

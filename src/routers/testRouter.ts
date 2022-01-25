import express from 'express'
import TestController from '../controllers/testController'
const router = express.Router()

router.post('/test/send-email', TestController.sendEmail)

export default router
import express from 'express'
import adminController from '../controllers/adminController'
const router = express.Router()

router.post('/admin/login', adminController.login)

export default router
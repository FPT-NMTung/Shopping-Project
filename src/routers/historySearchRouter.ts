import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/history-search', AuthorizationRouter) //Mon - NTDuong

export default router
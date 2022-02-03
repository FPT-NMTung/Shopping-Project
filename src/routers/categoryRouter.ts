import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/categories', AuthorizationRouter) //Mon - NTDuong

export default router
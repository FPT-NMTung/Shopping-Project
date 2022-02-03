import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/favorites', AuthorizationRouter) //Mon - NTDuong

router.post('/favorite/add', AuthorizationRouter) //Mon - NTDuong

router.delete('/favorite/delete', AuthorizationRouter) //Mon - NTDuong

export default router
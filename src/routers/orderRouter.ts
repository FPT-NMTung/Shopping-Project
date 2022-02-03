import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/orders', AuthorizationRouter) //missing controller

router.post('/order/add', AuthorizationRouter) //missing controller

router.delete('/order/delete', AuthorizationRouter) //missing controller

router.patch('/order/update-quantity', AuthorizationRouter) //missing controller

router.patch('/order/update-status', AuthorizationRouter) //missing controller

export default router
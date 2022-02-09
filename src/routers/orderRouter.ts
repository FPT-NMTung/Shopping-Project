import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
import OrderController from '../controllers/orderController'
const router = express.Router()

router.get('/orders', AuthorizationRouter, OrderController.getAllOrders)

router.post('/order/add', AuthorizationRouter, OrderController.addProductToOrder)

router.delete('/order/delete', AuthorizationRouter, OrderController.deleteProductFromOrder)

router.patch('/order/increase-quantity', AuthorizationRouter, OrderController.increaseProductQuantity)

router.patch('/order/decrease-quantity', AuthorizationRouter, OrderController.decreaseProductQuantity)

router.post('/order/check-out', AuthorizationRouter, OrderController.checkOut)

router.get('/order/histories', AuthorizationRouter, OrderController.getAllHistories)

export default router
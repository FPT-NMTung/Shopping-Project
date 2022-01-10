import express from 'express'
import ProductController from '../controllers/productController'

const router = express.Router()

router.get('/products', ProductController.getAllProduct)

router.get('/product/search', ProductController.searchProduct)

export default router

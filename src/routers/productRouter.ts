import express from 'express'
import ProductController from '../controllers/productController'

const router = express.Router()

router.get('/products', ProductController.getAllProduct)

router.post('/products-test', ProductController.getAllProduct)

router.get('/product/get', ProductController.getProduct)

router.get('/product/search', ProductController.searchProduct)

router.get('/product/get-top-trending', ProductController.getTopTrending)

router.get('/product/get-top-newest', ProductController.getTopNewestProduct)

router.get('/product/get-top-discount', ProductController.getTopDiscountProducts)

router.get('/product/get-by-category', ProductController.getByCategory)

export default router

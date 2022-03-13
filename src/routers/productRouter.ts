import express from 'express'
import ProductController from '../controllers/productController'
import AuthorizationRouter from '../middlewares/Authorization'

const router = express.Router()

router.get('/products', ProductController.getAllProduct)

router.post('/products-test', ProductController.getAllProduct)

router.get('/product/get', ProductController.getProduct)

router.get('/product/get-by-token', AuthorizationRouter, ProductController.getProductWithToken)

router.get('/product/search', ProductController.searchProduct)

router.get('/product/get-top-trending', ProductController.getTopTrending)

router.get('/product/get-top-newest', ProductController.getTopNewestProduct)

router.get('/product/get-top-discount', ProductController.getTopDiscountProducts)

router.get('/product/get-by-category', ProductController.getByCategory)

router.get('/product/get-by-category-similar', ProductController.getByCategorySimilar)

export default router

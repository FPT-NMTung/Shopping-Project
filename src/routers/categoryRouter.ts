import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
import CategoryController from "../controllers/categoryController";
const router = express.Router()

router.get('/categories', CategoryController.getAllCategories)

router.get('/category/get-top-category-product', CategoryController.getTopFourCategories)

export default router
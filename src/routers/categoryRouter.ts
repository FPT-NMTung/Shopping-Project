import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
import CategoryController from "../controllers/categoryController";
const router = express.Router()

router.get('/categories', AuthorizationRouter, CategoryController.getAllCategories)

export default router
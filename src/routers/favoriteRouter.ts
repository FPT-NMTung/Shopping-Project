import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
import FavoriteController from "../controllers/favoriteController";
const router = express.Router()

router.get('/favorites', AuthorizationRouter, FavoriteController.getAllFavoritesById) //Mon - NTDuong

router.post('/favorite/add', AuthorizationRouter) //Mon - NTDuong

router.delete('/favorite/delete', AuthorizationRouter, FavoriteController.favoriteDelete) //Mon - NTDuong

export default router
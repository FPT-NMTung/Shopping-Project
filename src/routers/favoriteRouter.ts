import express from 'express'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/favorites', AuthorizationRouter) //missing controller

router.get('/favorite/get', AuthorizationRouter) //missing controller

router.post('/favorite/add', AuthorizationRouter) //missing controller

router.delete('/favorite/delete', AuthorizationRouter) //missing controller

export default router
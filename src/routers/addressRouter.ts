import express from 'express'
import AddressController from '../controllers/addressController'
import AuthorizationRouter from '../middlewares/Authorization'
const router = express.Router()

router.get('/address/province', AddressController.getProvince)

router.get('/address/district', AddressController.getDistrict)

router.get('/address/ward', AddressController.getWard)

router.get('/address/get-all', AuthorizationRouter, AddressController.getAllAddress)

router.delete('/address/delete', AuthorizationRouter, AddressController.deleteAddress)

export default router
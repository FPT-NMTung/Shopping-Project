import express from 'express'
import AddressController from '../controllers/addressController'
const router = express.Router()

router.get('/address/province', AddressController.getProvince)

router.get('/address/district', AddressController.getDistrict)

router.get('/address/ward', AddressController.getWard)

export default router
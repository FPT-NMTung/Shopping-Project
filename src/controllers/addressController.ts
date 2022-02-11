import {Request, Response} from 'express'
import Address from '../models/address'
import verifyInput from '../common/commonFunction'
import jwt, {JwtPayload} from 'jsonwebtoken'

class AddressController {
  public static getProvince = async (req: Request, res: Response) => {
    const [data] = await Address.getProvince()

    return res.status(200).json({
      message: 'Get province success',
      data: data
    })
  }

  public static getDistrict = async (req: Request, res: Response) => {
    let provinceId = Number.parseInt(req.query.id as string)
    provinceId = verifyInput({
      input: provinceId,
      type: 'number',
      required: true
    }) as number

    const [data] = await Address.getDistrict(provinceId)
    const convert = Object.assign([], data)

    const result = convert.map((element) => {
      return {
        id: element['id'],
        name: element['name'],
        prefix: element['prefix']
      }
    })

    return res.status(200).json({
      message: 'Get district success',
      data: result
    })
  }

  public static getWard = async (req: Request, res: Response) => {
    let districtId = Number.parseInt(req.query.id as string)
    districtId = verifyInput({
      input: districtId,
      type: 'number',
      required: true
    }) as number

    const [data] = await Address.getWard(districtId)
    const convert = Object.assign([], data)

    const result = convert.map((element) => {
      return {
        id: element['id'],
        name: element['name'],
        prefix: element['prefix']
      }
    })

    return res.status(200).json({
      message: 'Get ward success',
      data: result
    })
  }

  public static getAllAddress = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [data] = await Address.getAllAddress(userId)

    const temp = data.map((element:any) => {
      delete element.provinceId
      delete element.districtId
      delete element.wardId
      return element
    })

    return res.status(200).json({
      message: 'Get all address success',
      data: temp
    })
  }

  public static deleteAddress = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    let addressId = Number.parseInt(req.body.id as string)
    addressId = verifyInput({
      input: addressId,
      type: 'number',
      required: true
    }) as number

    if (addressId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    await Address.deleteAddress(userId, addressId)

    return res.status(200).json({
      message: 'Delete address success'
    })
  }

  public static create = async (req: Request, res: Response) => {
    let fullName = req.body.fullName as string
    let phone = req.body.phone as string
    let provinceId = Number.parseInt(req.body.provinceId as string)
    let districtId = Number.parseInt(req.body.districtId as string)
    let wardId = Number.parseInt(req.body.wardId as string)
    let detail = req.body.detail as string

    fullName = verifyInput({
      input: fullName,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    }) as string

    phone = verifyInput({
      input: phone,
      type: 'string',
      required: true,
      min: 10,
      max: 10
    }) as string

    provinceId = verifyInput({
      input: provinceId,
      type: 'number',
      required: true
    }) as number

    districtId = verifyInput({
      input: districtId,
      type: 'number',
      required: true
    }) as number

    wardId = verifyInput({
      input: wardId,
      type: 'number',
      required: true
    }) as number

    detail = verifyInput({
      input: detail,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    }) as string

    if (fullName === null || phone === null || provinceId === null || districtId === null || wardId === null || detail === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [search] = await Address.getAllAddress(userId)
    let isDefault = false
    if (search.length === 0) {
      isDefault = true
    }

    await Address.create(userId, fullName, phone, provinceId, districtId, wardId, detail, isDefault)

    return res.status(200).json({
      message: 'Create address success'
    })
  }

  public static update = async (req: Request, res: Response) => {
    let fullName = req.body.fullName as string
    let phone = req.body.phone as string
    let provinceId = Number.parseInt(req.body.provinceId as string)
    let districtId = Number.parseInt(req.body.districtId as string)
    let wardId = Number.parseInt(req.body.wardId as string)
    let detail = req.body.detail as string
    let addressId = Number.parseInt(req.body.id as string)

    fullName = verifyInput({
      input: fullName,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    }) as string

    phone = verifyInput({
      input: phone,
      type: 'string',
      required: true,
      min: 10,
      max: 10
    }) as string

    provinceId = verifyInput({
      input: provinceId,
      type: 'number',
      required: true
    }) as number

    districtId = verifyInput({
      input: districtId,
      type: 'number',
      required: true
    }) as number

    wardId = verifyInput({
      input: wardId,
      type: 'number',
      required: true
    }) as number

    detail = verifyInput({
      input: detail,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100
    }) as string

    addressId = verifyInput({
      input: addressId,
      type: 'number',
      required: true
    }) as number

    if (fullName === null || phone === null || provinceId === null || districtId === null || wardId === null || detail === null || addressId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [search] = await Address.getAddress(addressId, userId)
    if (search.length === 0) {
      return res.status(400).json({
        message: 'Address not found'
      })
    }

    await Address.update(userId, addressId, fullName, phone, provinceId, districtId, wardId, detail)

    return res.status(200).json({
      message: 'Update address success'
    })
  }

  public static updateDefault = async (req: Request, res: Response) => {
    let addressId = Number.parseInt(req.body.id as string)

    addressId = verifyInput({
      input: addressId,
      type: 'number',
      required: true
    }) as number

    if (addressId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [searchAddress] = await Address.getAddress(addressId, userId)
    if (searchAddress.length === 0) {
      return res.status(400).json({
        message: 'Address not found'
      })
    }

    const [search] = await Address.getAddressDefault(userId)
    if (search.length !== 0) {
      await Address.updateDefault(userId, search[0].id, false)
    }

    await Address.updateDefault(userId, addressId, true)

    return res.status(200).json({
      message: 'Update default address success'
    })
  }

  public static getAddressById = async (req: Request, res: Response) =>{
    let id = Number.parseInt(req.query.id as string)

    id = verifyInput({
      input: id,
      required: true,
      type: "number"
    }) as number

    if (id === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [selectAddress] = await Address.getAddressById(id, userId)

    if (selectAddress.length === 0) {
      return res.status(404).json({
        message: 'Address not found'
      })
    }

    const temp = selectAddress[0]

    return res.status(200).json({
      message: 'Get address success',
      data: temp
    })
  }
}

export default AddressController
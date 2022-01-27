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

    return res.status(200).json({
      message: 'Get all address success',
      data: data
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
}

export default AddressController
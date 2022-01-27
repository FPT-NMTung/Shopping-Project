import {Request, Response} from 'express'
import Address from '../models/address'
import verifyInput from '../common/commonFunction'

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
      required: true,
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
      required: true,
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
}

export default AddressController
import {Request, Response} from 'express'
import verifyInput from '../common/commonFunction'
import Product from '../models/product'
import SearchHistory from '../models/seachHistory'
import jwt, {JwtPayload} from 'jsonwebtoken'

class ProductController {
  public static getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    console.log(123)
    const [data] = await Product.getAll()
    return res.status(200).json(data)
  }

  public static searchProduct = async (req: Request, res: Response): Promise<Response> => {

    let query = req.query.query as string
    let limit = Number.parseInt(req.query.limit as string)

    query = verifyInput({
      input: query,
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50
    }) as string
    limit = verifyInput({
      input: limit,
      type: 'number',
      required: true,
      min: 1,
      max: 50
    }) as number

    if (query === null || limit === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [data] = await Product.search(query, limit)
    if (req.headers.authorization) {
      const tokenPayLoad = jwt.verify(req.headers.authorization!.split(' ')[1], 'nmtungofficial') as JwtPayload
      await SearchHistory.addHistory(tokenPayLoad['id'] as string, query)
    }

    return res.status(200).json({
      message: 'Get products success',
      result: data
    })
  }
}

export default ProductController
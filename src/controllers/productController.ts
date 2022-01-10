import {NextFunction, Request, Response} from 'express'
import verifyInput from '../common/commonFunction'
import Product from '../models/product'

class ProductController {
  public static getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getAll()
    return res.status(200).json({
      message: 'Get all product success',
      result: data
    })
  }

  public static searchProduct = async (req: Request, res: Response): Promise<Response> => {
    let {query, limit} = req.body
    query = verifyInput({
      input: query,
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50,
    }) as string
    limit = verifyInput({
      input: limit,
      type: 'number',
      required: true,
      min: 1,
      max: 50,
    }) as number

    if (query === null || limit === null) {
      return res.status(400).json({
        message: 'Bad request'
      })
    }

    const [data] = await Product.search(query, limit)

    return res.status(200).json({
      message: 'Get products success',
      result: data
    })
  }
}

export default ProductController
import {NextFunction, Request, RequestHandler, Response} from 'express'
import Product from '../models/product'

class ProductController {
  public static getAllProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const data = await Product.getAll()
    return res.status(200).json({
      data: data
    })
  }
}

export default ProductController
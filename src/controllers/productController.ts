import {Request, Response} from 'express'
import verifyInput from '../common/commonFunction'
import Product from '../models/product'
import SearchHistory from '../models/seachHistory'
import jwt, {JwtPayload} from 'jsonwebtoken'
import Category from '../models/category'

class ProductController {
  public static getAllProduct = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getAll()
    return res.status(200).json({
      message: 'Get all product success',
      data: data
    })
  }

  public static getProduct = async (req: Request, res: Response): Promise<Response> => {
    let id = Number.parseInt(req.query.id as string)
    id = verifyInput({
      input: id,
      type: 'number',
      required: true,
    }) as number

    const [data] = await Product.getProduct(id)
    if (data.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
      })
    }

    const [dataCategory] = await Category.getCategoryWithProductId(data[0].id)
    return res.status(200).json({
      message: 'Get product success',
      data: {
        ...data[0],
        category: dataCategory
      }
    })
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
      const tokenPayLoad = jwt.verify(req.headers.authorization!.split(' ')[1], process.env.SECRET_KEY!) as JwtPayload
      await SearchHistory.addHistory(tokenPayLoad['id'] as string, query)
    }

    return res.status(200).json({
      message: 'Get products success',
      result: data
    })
  }

  public static getTopTrending = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getTopTrendingProducts()

    return res.status(200).json({
      message: 'Get top trending products success',
      result: data
    })
  }

  public static getTopNewestProduct = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getTopNewestProducts()

    return res.status(200).json({
      message: 'Get top newest products success',
      result: data
    })
  }

  public static getTopDiscountProducts = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getTopDiscountProducts()

    return res.status(200).json({
      message: 'Get top discount products success',
      result: data
    })
  }

  public static getByCategory  = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await Product.getByCategory(Number.parseInt(req.query.categoryId as string))

    return res.status(200).json({
      message: 'Get products by category success',
      result: data
    })
  }
}

export default ProductController
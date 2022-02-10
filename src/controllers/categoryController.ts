import {Request, Response} from 'express'
import Category from '../models/category'

class CategoryController {
  public static getAllCategories = async (req: Request, res: Response) => {
    const [getCategories] = await Category.getAllCategories()

    return res.status(200).json({
      message: 'Get categories success',
      data: getCategories
    })
  }

  public static getTopFourCategories = async (req: Request, res: Response) => {
    const [getCategories] = await Category.getTopCategories(4)

    const result = getCategories.map((category: any) => {
      return {
        id: category.id,
        name: category.name,
        image: category.image,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }
    })

    return res.status(200).json({
      message: 'Get top categories success',
      data: result
    })
  }
}

export default CategoryController
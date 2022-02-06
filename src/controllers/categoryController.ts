import {Request, Response} from "express";
import Category from "../models/category";

class CategoryController{
  public static getAllCategories = async (req: Request, res: Response) => {
    const [getCategories] = await Category.getAllCategories()
    if(getCategories.length === 0){
      return res.status(400).json({
        message : 'Category not found'
      })
    }
    return res.status(200).json({
      message : 'Get categories success',
      data : getCategories
    })
  }
}

export default CategoryController
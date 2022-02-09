import {Request, Response} from "express";
import Favorite from "../models/favorite";
import verifyInput from "../common/commonFunction";
import jwt, {JwtPayload} from "jsonwebtoken";

class FavoriteController {
  public static getAllFavoritesById = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [getFavorite] = await Favorite.getAllFavouritesById(userId);
    return res.status(200).json({
      message: 'Get favorite success',
      data: getFavorite
    })
  }

  public static favoriteDelete = async (req: Request, res: Response) => {
    let productId = req.body.productId as number

    productId = verifyInput({
      input: productId,
      type: 'number',
      required: true
    }) as number

    if (productId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [checkFavorite] = await Favorite.getFavoriteByProductId(productId, userId);
    if (checkFavorite.length === 0) {
      return res.status(400).json({
        message: 'Favorite not found'
      })
    }

    await Favorite.favoriteDelete(productId, userId);

    return res.status(200).json({
      message: 'Delete favorite success',
    })
  }
}

export default FavoriteController
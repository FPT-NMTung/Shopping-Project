import {Request, Response} from "express";
import Favorite from "../models/favorite";
import verifyInput from "../common/commonFunction";
import jwt, {JwtPayload} from "jsonwebtoken";

class FavoriteController{
  public static getAllFavoritesById = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [getFavorite] = await Favorite.getAllFavouritesById(userId);
    return res.status(200).json({
       message : 'Get categories success',
      data : getFavorite
    })
  }
}

export default FavoriteController
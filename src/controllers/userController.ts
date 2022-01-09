import {NextFunction, Request, RequestHandler, Response} from 'express'
import User from '../models/user'

class UserController {
  public static getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const data = await User.getAll()
    return res.status(200).json({
      data: data
    })
  }
}

export default UserController
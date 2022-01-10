import {NextFunction, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

class UserController {
  public static signUp = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body

    const searchUser = await User.getByEmail(email)
    if (searchUser.length > 0) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }

    const data = await User.getAll()

    return res.status(200).json({
      data: data
    })
  }
}

export default UserController
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import verifyInput from '../common/commonFunction'

class UserController {
  public static signUp = async (req: Request, res: Response): Promise<Response> => {
    let email = req.body.email as string
    let password = req.body.password as string

    email = <string>verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300,
    })
    password = <string>verifyInput({
      input: password,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    })

    if (email === null || password === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [searchUser] = await User.getByEmail(email)
    if (searchUser.length > 0) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    await User.createUser(email.split('@')[0], email, hashPassword)

    return res.status(200).json({
      message: 'User created'
    })
  }

  public static login = async (req: Request, res: Response) => {
    let email = req.body.email as string
    let password = req.body.password as string

    email = <string>verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300,
    })
    password = <string>verifyInput({
      input: password,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    })

    if (email === null || password === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [searchUser] = await User.getByEmail(email)
    if (searchUser.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const isPasswordValid = await bcrypt.compare(password, searchUser[0].password)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    const token = jwt.sign({
      id: searchUser[0].id,
      email: searchUser[0].email,
      name: searchUser[0].name,
    }, 'nmtungofficial')

    return res.status(200).json({
      message: 'Login success',
      token: token
    })
  }
}

export default UserController
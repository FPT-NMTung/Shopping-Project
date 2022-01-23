import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import verifyInput from '../common/commonFunction'
import templateActiveCode from '../common/templateActiveCode'
import SendMail from '../config/mailManager'
import user from '../models/user'
import Product from "../models/product";

class UserController {
  public static signUp = async (req: Request, res: Response): Promise<Response> => {
    let email = req.body.email as string
    let password = req.body.password as string

    email = <string>verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300
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

    const randomActiveCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const activeCode = Array.from(Array(8).keys()).map(i => randomActiveCode[Math.floor(Math.random() * randomActiveCode.length)]).join(
      '')

    const hashPassword = await bcrypt.hash(password, 12)
    await User.createUser(email.split('@')[0], email, hashPassword, activeCode)

    // send email
    const content = {
      to: [email],
      from: 'nmtung.temp@gmail.com',
      fromname: 'Shopping | Project', // We set the `fromname` parameter here
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: templateActiveCode(email, activeCode)
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        res.status(500).json({
          message: 'Internal server error'
        })
      }
    })

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
      maxLength: 300
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
      name: searchUser[0].name
    }, 'nmtungofficial')

    return res.status(200).json({
      message: 'Login success',
      token: token
    })
  }

  public static active = async (req: Request, res: Response) => {
    let userId = req.body.userId as number
    let activeCode = req.body.code as string

    userId = <number>verifyInput({
      input: userId,
      type: 'number',
      required: true,
    })
    activeCode = <string>verifyInput({
      input: activeCode,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 8,
    })

    if (userId === null || activeCode === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [searchUser] = await User.getById(userId)
    if (searchUser.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    if (searchUser[0].codeActive === null) {
      return res.status(409).json({
        message: 'User already active'
      })
    }

    if (searchUser[0].codeActive !== activeCode) {
      return res.status(401).json({
        message: 'Invalid active code'
      })
    }

    if (searchUser[0].expCodeActive < Date.now()) {
      return res.status(401).json({
        message: 'Active code expired'
      })
    }

    await User.active(userId)
    return res.status(200).json({
      message: 'Active success'
    })
  }

  public static getAll = async (req: Request, res: Response): Promise<Response> => {
    const [data] = await User.getAll()

    const newList = data.map((element: any) => {
      return {
        name: element.name,
        email: element.email
      }
    })

    return res.status(200).json(newList)
  }
}

export default UserController
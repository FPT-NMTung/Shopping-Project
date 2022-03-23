import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt, {JwtPayload} from 'jsonwebtoken'
import verifyInput from '../common/commonFunction'
import templateActiveCode from '../common/templateActiveCode'
import SendMail from '../config/mailManager'
import cloudinary from '../config/cloudinary'
import TemplateForgotPassword from '../common/templateForgotPassword'

class UserController {
  public static signUp = async (req: Request, res: Response) => {
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
    await User.createUser(email, hashPassword, activeCode)

    // send email
    const content = {
      to: [email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: templateActiveCode(email, activeCode)
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error',
          data: err.message
        })
      }

      return res.status(200).json({
        message: 'User created'
      })
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
    }, process.env.SECRET_KEY!)

    return res.status(200).json({
       message: 'Login success',
       token: token
    })
  }

  public static active = async (req: Request, res: Response) => {
    let activeCode = req.body.code as string
    activeCode = <string>verifyInput({
      input: activeCode,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 8
    })

    const payload = jwt.verify(req.headers.authorization?.split(' ')[1]!, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

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

  public static changePassword = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]!
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload['id']

    let password = req.body.password as string
    password = verifyInput({
      input: password,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      required: true,
      type: 'string'
    }) as string

    let oldPassword = req.body.oldPassword as string
    oldPassword = verifyInput({
      input: oldPassword,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      required: true,
      type: 'string'
    }) as string

    if (password === null || oldPassword === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [selectUser] = await User.getById(userId)
    if (selectUser.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, selectUser[0].password)
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Old password is wrong'
      })
    }

    const isPasswordSame = await bcrypt.compare(password, selectUser[0].password)
    if (isPasswordSame) {
      return res.status(409).json({
        message: 'New password is same with old password'
      })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    await User.changePassword(userId, hashPassword)

    return res.status(200).json({
      message: 'Change password success'
    })
  }

  public static getInformation = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    let [data] = await User.getById(userId)

    if (data.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    let temp = Object.assign({}, data)['0']
    temp.isActive = (temp.codeActive === null)

    delete temp.password
    delete temp.codeActive
    delete temp.expCodeActive
    delete temp.codeForgotPassword
    delete temp.expCodeForgotPassword

    return res.status(200).json({
      message: 'Get information success',
      data: temp
    })
  }

  public static sendEmailForgotPassword = async (req: Request, res: Response) => {
    let email = req.body.email as string
    email = verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 50
    }) as string

    if (email === null) {
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

    const randomCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const code = Array.from(Array(8).keys()).map(i => randomCode[Math.floor(Math.random() * randomCode.length)]).join(
      '')

    await User.updateCodeForgotPassword(searchUser[0].id, code)

    // send email
    const content = {
      to: [email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Forgot password code | Shopping',
      text: 'Forgot password code | Shopping',
      html: TemplateForgotPassword(email, code)
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error',
          data: err.message
        })
      }

      return res.status(200).json({
        message: 'Send email success'
      })
    })
  }

  public static changePasswordByCodeForgotPassword = async (req: Request, res: Response) => {
    let code = req.body.code as string
    let password = req.body.password as string
    let email = req.body.email as string
    code = verifyInput({
      input: code,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 50
    }) as string

    password = verifyInput({
      input: password,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      required: false,
      type: 'string'
    }) as string

    email = verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 300
    }) as string

    if (code === null || password === null || email === null) {
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

    if (searchUser[0].codeForgotPassword !== code) {
      return res.status(400).json({
        message: 'Code is not correct'
      })
    }

    if (searchUser[0].expCodeForgotPassword < new Date()) {
      return res.status(400).json({
        message: 'Code is expired'
      })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    await User.changePassword(searchUser[0].id, hashPassword)

    return res.status(200).json({
      message: 'Change password success'
    })
  }

  public static updateInformation = async (req: Request, res: Response) => {
    let image = req.body.image as string
    let firstName = req.body.firstName as string
    let lastName = req.body.lastName as string
    let phone = req.body.phone as string
    let gender = req.body.gender as number

    console.log(image)

    firstName = verifyInput({
      input: firstName,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 50
    }) as string
    lastName = verifyInput({
      input: lastName,
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 50
    }) as string
    phone = verifyInput({
      input: phone,
      type: 'string',
      required: true,
      minLength: 10,
      maxLength: 10
    }) as string
    gender = verifyInput({
      input: gender,
      type: 'number',
      required: true,
    }) as number

    const payload = jwt.verify(req.headers.authorization?.split(' ')[1]!, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    let urlImage = null
    if (image !== null && image !== undefined) {
      urlImage = (await cloudinary.v2.uploader.upload(image)).secure_url
    }

    if (image === null || image === undefined) {
      await User.updateInformationWithoutImage(firstName, lastName, gender, phone, userId)
    } else {
      await User.updateInformation(firstName, lastName, gender, phone, urlImage, userId)
    }

    res.status(200).json({
      message: 'Update information success'
    })
  }

  public static sendEmailVerifyAccount = async (req: Request, res: Response) => {
    const payload = jwt.verify(req.headers.authorization?.split(' ')[1]!, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const randomActiveCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const activeCode = Array.from(Array(8).keys()).map(i => randomActiveCode[Math.floor(Math.random() * randomActiveCode.length)]).join(
      '')

    const [data] = await User.getById(userId)

    if (data[0].codeActive === null) {
      return res.status(400).json({
        message: 'User already active'
      })
    }

    await User.setCodeActive(activeCode, userId)

    // send email
    const content = {
      to: [data[0].email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: templateActiveCode(data[0].email, activeCode)
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error',
          data: err.message
        })
      }

      return res.status(200).json({
        message: 'Send email successfully'
      })
    })
  }
}

export default UserController
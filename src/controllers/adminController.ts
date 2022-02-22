import {Request, Response} from 'express'
import verifyInput from '../common/commonFunction'
import Admin from '../models/admin'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AddressController {
  public static login = async (req: Request, res: Response) => {
    let username = req.body.username as string
    let password = req.body.password as string

    username = verifyInput({
      input: username,
      type: 'string',
      required: true
    }) as string
    password = verifyInput({
      input: password,
      type: 'string',
      required: true
    }) as string

    if (username === null || password === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const [select] = await Admin.getAdmin(username);

    if (select.length === 0) {
      return res.status(400).json({
        message: 'Admin not found'
      })
    }

    const isValid = await bcrypt.compare(password, select[0].password);

    if (!isValid) {
      return res.status(401).json({
        message: 'Invalid password'
      })
    }

    const token = jwt.sign({
      id: select[0].id,
      email: select[0].username
    }, process.env.SECRET_KEY!)

    return res.status(200).json({
      message: 'Login success',
      data: token
    })
  }
}

export default AddressController;
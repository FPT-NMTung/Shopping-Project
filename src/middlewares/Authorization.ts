import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const AuthorizationRouter = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers.authorization

  if (!tokenHeader) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  const token = tokenHeader.split(' ')[1]

  try {
    jwt.verify(token, 'nmtungofficial')
  } catch (e) {
    res.status(401).json({
      message: 'Not authenticated'
    })
    return
  }

  next()
}

export default AuthorizationRouter
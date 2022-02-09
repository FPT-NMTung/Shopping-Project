import {Request, Response} from 'express'
import Order from '../models/order'
import verifyInput from '../common/commonFunction'
import jwt, {JwtPayload} from 'jsonwebtoken'

class OrderController {
  public static getAllOrders = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getAllOrders(userId)

    const temp = select.map((element:any) => {
      return {
        id: element.id,
        product: {
          id: element.productId,
          name: element.name,
          description: element.description,
          discount: element.discount,
          price: element.price,
          image: element.image,
          quantity: element.productQuantity,
          quantitySold: element.quantitySold,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt,
        },
        quantity: element.quantity,
      }
    })

    return res.status(200).json({
      message: 'Successfully get all orders',
      data: temp,
    })
  }
}

export default OrderController
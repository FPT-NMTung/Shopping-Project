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

    const temp = select.map((element: any) => {
      return {
        product: {
          id: element.productId,
          name: element.name,
          description: element.description,
          discount: element.discount,
          price: element.price,
          image: element.image,
          quantity: element.productQuantity,
          quantitySold: element.quantitySold,
          createdAt: element.productCreatedAt,
          updatedAt: element.productUpdatedAt
        },
        quantity: element.quantity,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt
      }
    })

    return res.status(200).json({
      message: 'Successfully get all orders',
      data: temp
    })
  }

  public static addProductToOrder = async (req: Request, res: Response) => {
    let productId = req.body.productId as number
    let quantity = req.body.quantity as number

    productId = verifyInput({
      input: productId,
      required: true,
      type: 'number'
    }) as number

    quantity = verifyInput({
      input: quantity,
      required: true,
      type: 'number',
      min: 1,
      max: 10
    }) as number

    if (productId === null || quantity === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getOrderByProductId(productId, userId)
    if (select.length > 0) {
      await Order.updateQuantity(productId, quantity + select[0].quantity, userId)
    } else {
      await Order.addProductToCart(productId, quantity, userId)
    }

    return res.status(201).json({
      message: 'Successfully add product to cart'
    })
  }

  public static getAllHistories = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getHistoryOrders(userId)

    const temp = select.map((element: any) => {
      return {
        product: {
          id: element.productId,
          name: element.name,
          description: element.description,
          discount: element.discount,
          price: element.price,
          image: element.image,
          quantity: element.productQuantity,
          quantitySold: element.quantitySold,
          createdAt: element.productCreatedAt,
          updatedAt: element.productUpdatedAt
        },
        address: {
          nameProvince: element.nameProvince,
          prefixDistrict: element.prefixDistrict,
          nameDistrict: element.nameDistrict,
          prefixWard: element.prefixWard,
          nameWard: element.nameWard,
          detail: element.detail
        },
        quantity: element.quantity,
        createdAt: element.createdAt,
        updatedAt: element.updatedAt
      }
    })

    return res.status(200).json({
      message: 'Successfully get all histories',
      data: temp
    })
  }
}

export default OrderController
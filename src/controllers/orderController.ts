import {Request, Response} from 'express'
import Order from '../models/order'
import verifyInput from '../common/commonFunction'
import jwt, {JwtPayload} from 'jsonwebtoken'
import Address from '../models/address'
import Product from '../models/product'
import SendMail from '../config/mailManager'
import TemplateForgotPassword from '../common/templateForgotPassword'
import templateBill from '../common/templateBill'
import User from '../models/user'

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

  public static deleteProductFromOrder = async (req: Request, res: Response) => {
    let productId = req.body.productId as number

    productId = verifyInput({
      input: productId,
      required: true,
      type: 'number'
    }) as number

    if (productId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getOrderByProductId(productId, userId)
    if (select.length === 0) {
      return res.status(404).json({
        message: 'Product not found in order'
      })
    }

    await Order.deleteProductFromOrder(productId, userId)

    return res.status(200).json({
      message: 'Successfully delete product from cart'
    })
  }

  public static increaseProductQuantity = async (req: Request, res: Response) => {
    let productId = req.body.productId as number

    productId = verifyInput({
      input: productId,
      required: true,
      type: 'number'
    }) as number

    if (productId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getOrderByProductId(productId, userId)
    if (select.length === 0) {
      return res.status(404).json({
        message: 'Product not found in order'
      })
    }

    if (select[0].quantity >= 10) {
      return res.status(400).json({
        message: 'Product quantity is already 10'
      })
    }

    await Order.updateQuantity(productId, select[0].quantity + 1, userId)

    return res.status(200).json({
      message: 'Successfully increase product quantity'
    })
  }

  public static decreaseProductQuantity = async (req: Request, res: Response) => {
    let productId = req.body.productId as number

    productId = verifyInput({
      input: productId,
      required: true,
      type: 'number'
    }) as number

    if (productId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [select] = await Order.getOrderByProductId(productId, userId)
    if (select.length === 0) {
      return res.status(404).json({
        message: 'Product not found in order'
      })
    }

    if (select[0].quantity <= 1) {
      return res.status(400).json({
        message: 'Product quantity is already 1'
      })
    }

    await Order.updateQuantity(productId, select[0].quantity - 1, userId)

    return res.status(200).json({
      message: 'Successfully decrease product quantity'
    })
  }

  public static checkOut = async (req: Request, res: Response) => {
    let addressId = req.body.addressId as number

    addressId = verifyInput({
      input: addressId,
      required: true,
      type: 'number'
    }) as number

    if (addressId === null) {
      return res.status(400).json({
        message: 'Invalid input'
      })
    }

    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id

    const [addressSelect] = await Address.getAddressById(addressId, userId)
    if (addressSelect.length === 0) {
      return res.status(404).json({
        message: 'Address not found'
      })
    }

    const [select] = await Order.getAllProductAndQuantityInOrder(userId)

    if (select.length === 0) {
      return res.status(404).json({
        message: 'No product in cart'
      })
    }

    const result = select.map((element: any) => {
      return [userId, element.productId, addressId, element.quantity]
    })

    const updateData = select.map((element: any) => {
      return [element.productId, element.quantity]
    })

    await Order.checkOutProduct([result])
    await Order.deleteAllProductInOrder(userId)

    await Product.updateQuantitySold(updateData)

    const [userSelect] = await User.getById(userId)
    const data = select.map((element: any) => {
      return {
        name: element.name,
        quantity: element.quantity,
        price: element.price,
        discount: element.discount,
      }
    })
    await SendMail.sendMail({
      to: [userSelect[0].email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Forgot password code | Shopping',
      text: 'Forgot password code | Shopping',
      html: templateBill(data)
    })

    return res.status(200).json({
      message: 'Successfully check out'
    })
  }

  public static getAllHistories = async (req: Request, res: Response) => {
    const token = (req.headers.authorization as string).split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
    const userId = payload.id
    
    const status = Number.parse(req.query.status as string)

    const [select] = await Order.getHistoryOrders(userId, status)

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
import {Request, Response} from 'express'
import SendMail from '../config/mailManager'
import verifyInput from '../common/commonFunction'
import TemplateBill from '../common/templateBill'
import templateActiveCode from '../common/templateActiveCode'

class TestController {
  public static sendEmail = async (req: Request, res: Response) => {
    let email = req.body.email as string
    email = verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300
    }) as string

    // send email
    const content = {
      to: [email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: `<p>Test send email from project to ${email}</p>`
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error'
        })
      }

      return res.status(200).json({
        message: 'Email sent'
      })
    })
  }

  public static sendEmailBill = async (req: Request, res: Response) => {
    let email = req.body.email as string
    email = verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300
    }) as string

    // send email
    // const content = {
    //   to: [email],
    //   from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
    //   subject: 'Active code | Shopping',
    //   text: 'Active code | Shopping',
    //   html: TemplateBill([
    //     {
    //       name: 'product 1',
    //       price: 10,
    //       quantity: 1
    //     },
    //     {
    //       name: 'product 2',
    //       price: 20,
    //       quantity: 2
    //     },
    //     {
    //       name: 'product 3',
    //       price: 30,
    //       quantity: 3
    //     }
    //   ], email)
    // }

    // SendMail.sendMail(content, function (err, a) {
    //   if (err) {
    //     return res.status(500).json({
    //       message: 'Internal server error'
    //     })
    //   }

      return res.status(200).json({
        message: 'Email test is disabled'
      })
    // })
  }

  public static sendMailActive = async (req: Request, res: Response) => {
    let email = req.body.email as string
    email = verifyInput({
      input: email,
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 300
    }) as string

    SendMail.sendMail({
      to: [email],
      from: 'JUMBO Clothes Store <admin@nmtung.xyz>',
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: templateActiveCode(email, 'JH74HSG3'),
      priority: "high",
    }, function (err, a) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error'
        })
      }

      return res.status(200).json({
        message: 'Email sent'
      })
    })
  }
}

export default TestController
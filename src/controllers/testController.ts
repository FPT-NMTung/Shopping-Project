import {Request, Response} from 'express'
import templateActiveCode from '../common/templateActiveCode'
import SendMail from '../config/mailManager'
import verifyInput from '../common/commonFunction'

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
      from: 'nmtung.temp@gmail.com',
      fromname: 'Shopping | Project', // We set the `fromname` parameter here
      subject: 'Active code | Shopping',
      text: 'Active code | Shopping',
      html: `<p>Test send email from project to ${email}</p>`
    }

    SendMail.sendMail(content, function (err, a) {
      if (err) {
        res.status(500).json({
          message: 'Internal server error'
        })
      }
    })

    return res.status(200).json({
      message: 'Email sent'
    })
  }
}

export default TestController
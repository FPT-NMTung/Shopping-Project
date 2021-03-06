import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class User {
  constructor() {
  }

  public static getByEmail(email: string): Promise<RowDataPacket[]> {
    return db.execute('select * from user where email = ?', [email]) as Promise<RowDataPacket[]>
  }

  public static getById(id: number): Promise<RowDataPacket[]> {
    return db.execute('select * from user where id = ?', [id]) as Promise<RowDataPacket[]>
  }

  public static createUser(email: string, password: string, activeCode: string): Promise<RowDataPacket[]> {
    const createdAt = new Date()
    // after 15 minutes, the active code will be expired
    const expiredAt = new Date(createdAt.getTime() + 15 * 60 * 1000)

    return db.execute(
      'insert into user (email, password, codeActive, expCodeActive) values (?, ?, ?, ?)',
      [email, password, activeCode, expiredAt]) as Promise<RowDataPacket[]>
  }

  public static active(id: number) {
    return db.execute('update user set codeActive = NULL, expCodeActive = NULL where id = ?',
      [id]) as Promise<RowDataPacket[]>
  }

  public static setCodeActive(code: string, userId: number) {
    const createdAt = new Date()
    // after 15 minutes, the active code will be expired
    const expiredAt = new Date(createdAt.getTime() + 15 * 60 * 1000)

    return db.execute('update user set codeActive = ?, expCodeActive = ? where id = ?',
      [code, expiredAt, userId]) as Promise<RowDataPacket[]>
  }

  public static changePassword(id: number, password: string) {
    return db.execute('update user set password = ? where id = ?',
      [password, id]) as Promise<RowDataPacket[]>
  }

  public static updateCodeForgotPassword(id: number, code: string) {
    const expiredAt = new Date(new Date().getTime() + 15 * 60 * 1000)

    return db.execute('update user set codeForgotPassword = ?, expCodeForgotPassword = ? where id = ?',
      [code, expiredAt, id]) as Promise<RowDataPacket[]>
  }

  public static updateInformation(
    firstName: string | null,
    lastName: string | null,
    gender: number | null,
    phone: string | null,
    avatar: string | null,
    id: number
  ) {
    return db.execute(
      'update user set firstName = ?, lastName = ?, gender = ?, phone = ?, avatar = ? where id = ?',
      [firstName, lastName, gender, phone, avatar, id]) as Promise<RowDataPacket[]>
  }

  public static updateInformationWithoutImage (
    firstName: string | null,
    lastName: string | null,
    gender: number | null,
    phone: string | null,
    id: number
  ) {
    return db.execute(
      'update user set firstName = ?, lastName = ?, gender = ?, phone = ? where id = ?',
      [firstName, lastName, gender, phone, id]) as Promise<RowDataPacket[]>
  }
}

export default User
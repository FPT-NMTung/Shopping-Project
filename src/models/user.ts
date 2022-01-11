import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class User {
  constructor() {
  }

  public static getAll(): Promise<RowDataPacket[]> {
    return db.execute('select * from user') as Promise<RowDataPacket[]>
  }

  public static getByEmail(email: string): Promise<RowDataPacket[]> {
    return db.execute('select * from user where email = ?', [email]) as Promise<RowDataPacket[]>
  }

  public static getById(id: number): Promise<RowDataPacket[]> {
    return db.execute('select * from user where id = ?', [id]) as Promise<RowDataPacket[]>
  }

  public static createUser(name: string, email: string, password: string, activeCode: string): Promise<RowDataPacket[]> {
    const createdAt = new Date()
    const updatedAt = new Date()
    // after 15 minutes, the active code will be expired
    const expiredAt = new Date(createdAt.getTime() + 15 * 60 * 1000)

    return db.execute('insert into user (email, password, name, createdAt, updatedAt, codeActive, expCodeActive) values (?, ?, ?, ?, ?, ?, ?)',
      [email, password, name, createdAt, updatedAt, activeCode, expiredAt]) as Promise<RowDataPacket[]>
  }

  public static active(id: number) {
    return db.execute('update user set codeActive = NULL, expCodeActive = NULL where id = ?', [id]) as Promise<RowDataPacket[]>
  }
}

export default User
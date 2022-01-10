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

  public static createUser(name: string, email: string, password: string): Promise<RowDataPacket[]> {
    const createdAt = new Date()
    const updatedAt = new Date()

    return db.execute('insert into user (email, password, name, createdAt, updatedAt) values (?, ?, ?, ?, ?)',
      [email, password, name, createdAt, updatedAt]) as Promise<RowDataPacket[]>
  }
}

export default User
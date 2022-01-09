import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class User {
  constructor() {
  }

  public static getAll(): Promise<RowDataPacket[]> {
    return db.execute('select * from user') as Promise<RowDataPacket[]>
  }
}

export default User
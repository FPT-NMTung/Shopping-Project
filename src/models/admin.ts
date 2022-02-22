import {RowDataPacket} from 'mysql2'
import db from '../config/database'

class Admin {
  public static getAdmin(username: string): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM admin WHERE username = ?', [username]) as Promise<RowDataPacket[]>
  }
}

export default Admin
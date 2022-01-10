import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Product {
  constructor() {
  }

  public static getAll(): Promise<RowDataPacket[]> {
    return db.execute('select * from product') as Promise<RowDataPacket[]>
  }

  public static search(query: string, limit: number): Promise<RowDataPacket[]> {
    return db.query(`select * from product where name like ? limit ?`,
      [`%${query}%`, limit]) as Promise<RowDataPacket[]>
  }
}

export default Product
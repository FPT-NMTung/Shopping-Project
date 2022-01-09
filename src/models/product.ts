import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Product {
  constructor() {
  }

  public static getAll(): Promise<RowDataPacket[]> {
    return db.execute('select * from product') as Promise<RowDataPacket[]>
  }
}

export default Product
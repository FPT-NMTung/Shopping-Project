import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Address {
  public static getProvince(): Promise<RowDataPacket[]>  {
    return db.execute('SELECT * FROM province') as Promise<RowDataPacket[]>
  }

  public static getDistrict(id: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM district where provinceId = ?', [id]) as Promise<RowDataPacket[]>
  }

  public static getWard(id: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM ward where districtId = ?', [id]) as Promise<RowDataPacket[]>
  }
}

export default Address
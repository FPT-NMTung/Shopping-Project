import db from '../config/database'
import {RowDataPacket} from 'mysql2'
import user from './user'

class Address {
  public static getProvince(): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM province') as Promise<RowDataPacket[]>
  }

  public static getDistrict(id: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM district where provinceId = ?', [id]) as Promise<RowDataPacket[]>
  }

  public static getWard(id: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM ward where districtId = ?', [id]) as Promise<RowDataPacket[]>
  }

  public static getAllAddress(userId: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM address where userId = ?'
    , [userId]) as Promise<RowDataPacket[]>
  }

  public static deleteAddress(userId: number, addressId: number): Promise<RowDataPacket[]> {
    return db.execute('DELETE FROM address where userId = ? and id = ?', [userId, addressId]) as Promise<RowDataPacket[]>
  }
}

export default Address
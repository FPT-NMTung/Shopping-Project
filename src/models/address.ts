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

  public static getAddress(id: number, userId: number): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM address where id = ? and userId = ?'
    , [id, userId]) as Promise<RowDataPacket[]>
  }

  public static getAddressDefault(userId: string): Promise<RowDataPacket[]> {
    return db.execute('SELECT * FROM address where isDefault = 1 and userId = ?',
      [userId]) as Promise<RowDataPacket[]>
  }

  public static deleteAddress(userId: number, addressId: number): Promise<RowDataPacket[]> {
    return db.execute('DELETE FROM address where userId = ? and id = ?', [userId, addressId]) as Promise<RowDataPacket[]>
  }

  public static create (userId: number, fullName: string, phone: string, provinceId: number, districtId: number, wardId: number, detail: string, isDefault: boolean): Promise<RowDataPacket[]> {
    return db.execute('INSERT INTO address (userId, fullName, phone, provinceId, districtId, wardId, detail, isDefault) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, fullName, phone, provinceId, districtId, wardId, detail, isDefault]) as Promise<RowDataPacket[]>
  }

  public static update (userId: number, addressId: number, fullName: string, phone: string, provinceId: number, districtId: number, wardId: number, detail: string): Promise<RowDataPacket[]> {
    return db.execute('UPDATE address SET fullName = ?, phone = ?, provinceId = ?, districtId = ?, wardId = ?, detail = ? WHERE userId = ? and id = ?',
      [fullName, phone, provinceId, districtId, wardId, detail, userId, addressId]) as Promise<RowDataPacket[]>
  }

  public static updateDefault (userId: number, addressId: number, isDefault: boolean): Promise<RowDataPacket[]> {
    return db.execute('UPDATE address SET isDefault = ? WHERE userId = ? and id = ?',
      [isDefault, userId, addressId]) as Promise<RowDataPacket[]>
  }

  public static getAddressById (id: number, userId: number): Promise<RowDataPacket[]> {
    return db.execute('select * from address where id = ? and userId = ?',
      [id, userId]) as Promise<RowDataPacket[]>
  }
}

export default Address
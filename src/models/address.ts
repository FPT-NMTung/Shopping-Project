import db from '../config/database'
import {RowDataPacket} from 'mysql2'

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
    return db.execute('select address.*,\n' +
      '       p.name \'provinceName\',\n' +
      '       d.name \'districtName\',\n' +
      '       d.prefix \'districtPrefix\',\n' +
      '       w.name \'wardName\',\n' +
      '       w.prefix \'wardPrefix\'\n' +
      'from address\n' +
      'left join province p on address.provinceId = p.id\n' +
      'left join district d on address.districtId = d.id\n' +
      'left join ward w on address.wardId = w.id\n' +
      'where userId = ?\n' +
      'order by address.isDefault desc ;'
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

  public static getAddressDetailById (id: number, userId: number): Promise<RowDataPacket[]> {
    return db.execute('select a.fullName,\n' +
      '       a.detail,\n' +
      '       a.phone,\n' +
      '       p.name \'provinceName\',\n' +
      '       d.prefix \'districtPrefix\',\n' +
      '       d.name \'districtName\',\n' +
      '       w.prefix \'wardPrefix\',\n' +
      '       w.name \'wardName\'\n' +
      'from address a\n' +
      'left join province p on p.id = a.provinceId\n' +
      'left join district d on d.id = a.districtId\n' +
      'left join ward w on a.wardId = w.id\n' +
      'where a.id = ? and a.userId = ?',
      [id, userId]) as Promise<RowDataPacket[]>
  }
}

export default Address
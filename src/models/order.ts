import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Order {
  public static getAllOrders = (userId: number): Promise<RowDataPacket[]> => {
    return db.execute('select \n' +
      '       p.name,\n' +
      '       p.id \'productId\',\n' +
      '       p.description,\n' +
      '       p.discount,\n' +
      '       p.price,\n' +
      '       p.image,\n' +
      '       p.quantity \'productQuantity\',\n' +
      '       p.quantitySold,\n' +
      '       p.createdAt \'productCreatedAt\',\n' +
      '       p.updatedAt \'productUpdatedAt\',\n' +
      '       o.quantity,\n' +
      '       o.createdAt,\n' +
      '       o.updatedAt\n' +
      'from `order` o\n' +
      '         left join product p on p.id = o.productId\n' +
      'where o.userId = ?\n',
      [userId]) as Promise<RowDataPacket[]>
  }

  public static getHistoryOrders = (userId: number): Promise<RowDataPacket[]> => {
    return db.execute('select \n' +
      '       p.name,\n' +
      '       p.id       \'productId\',\n' +
      '       p.description,\n' +
      '       p.discount,\n' +
      '       p.price,\n' +
      '       p.image,\n' +
      '       p.quantity \'productQuantity\',\n' +
      '       p.quantitySold,\n' +
      '       p.createdAt \'productCreatedAt\',\n' +
      '       p.updatedAt \'productUpdatedAt\',\n' +
      '       p2.name \'nameProvince\',\n' +
      '       d.prefix \'prefixDistrict\',\n' +
      '       d.name \'nameDistrict\',\n' +
      '       w.prefix \'prefixWard\',\n' +
      '       w.name \'nameWard\',\n' +
      '       a.detail,\n' +
      '       o.quantity,\n' +
      '       o.createdAt,\n' +
      '       o.updatedAt\n' +
      'from `order` o\n' +
      '         left join product p on p.id = o.productId\n' +
      '         left join address a on a.id = o.addressId\n' +
      '         left join province p2 on a.provinceId = p2.id\n' +
      '         left join district d on a.districtId = d.id\n' +
      '         left join ward w on a.wardId = w.id\n' +
      'where o.userId = 7\n' +
      '  and o.addressId is not null\n',
      [userId]) as Promise<RowDataPacket[]>
  }

  public static addProductToCart = (productId: number, quantity: number, userId: number): Promise<RowDataPacket[]> => {
    return db.execute('insert into `order` (userId, productId, addressId, quantity, createdAt, updatedAt) values (?, ?, null, ?, ?, ?)',
      [userId, productId, quantity, new Date(), new Date()]) as Promise<RowDataPacket[]>
  }

  public static getOrderById = (id: number, userId: number): Promise<RowDataPacket[]> => {
    return db.execute('select * from `order` where id = ? and userId = ?',
      [id, userId]) as Promise<RowDataPacket[]>
  }

  public static getOrderByProductId = (productId: number, userId: number): Promise<RowDataPacket[]> => {
    return db.execute('select * from `order` where productId = ? and userId = ?',
      [productId, userId]) as Promise<RowDataPacket[]>
  }

  public static updateQuantity = (id: number, quantity: number, userId: number): Promise<RowDataPacket[]> => {
    return db.execute('update `order` set quantity = ?, updatedAt = ? where id = ? and userId = ?',
      [quantity, new Date(), id, userId]) as Promise<RowDataPacket[]>
  }


}

export default Order
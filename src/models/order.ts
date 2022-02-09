import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Order {
  public static getAllOrders = (userId: number):Promise<RowDataPacket[]> => {
    return db.execute('select o.id \'id\',\n' +
      '       p.name,\n' +
      '       p.id \'productId\',\n' +
      '       p.description,\n' +
      '       p.discount,\n' +
      '       p.price,\n' +
      '       p.image,\n' +
      '       p.quantity \'productQuantity\',\n' +
      '       p.quantitySold,\n' +
      '       p.createdAt,\n' +
      '       p.updatedAt,\n' +
      '       o.quantity\n' +
      'from `order` o\n' +
      '         left join product p on p.id = o.productId\n' +
      'where o.userId = ?\n' +
      '  and o.addressId is null',
      [userId]) as Promise<RowDataPacket[]>
  }
}

export default Order
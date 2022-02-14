import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class Product {
  public static getAll(): Promise<RowDataPacket[]> {
    return db.execute('select * from product') as Promise<RowDataPacket[]>
  }

  public static search(query: string, limit: number): Promise<RowDataPacket[]> {
    return db.query(`select * from product where name like ? limit ?`,
      [`%${query}%`, limit]) as Promise<RowDataPacket[]>
  }

  public static updateQuantitySold(data: number[][]): Promise<RowDataPacket[]> {
    const resultString = data.map((element) => {
      return [...element, '', 0, '', 0, '', 0]
    })

    return db.query('INSERT INTO product (id, quantitySold, name, quantity, image, price, description, discount)\n' +
      'VALUES\n' +
      ' ? \n' +
      'ON DUPLICATE KEY UPDATE\n' +
      ' id=VALUES(id), quantitySold=VALUES(quantitySold)+quantitySold',
      [resultString]) as Promise<RowDataPacket[]>
  }

  public static getTopTrendingProducts(): Promise<RowDataPacket[]> {
    return db.query('select * from product order by quantitySold desc limit 10') as Promise<RowDataPacket[]>
  }

  public static getTopNewestProducts(): Promise<RowDataPacket[]> {
    return db.query('select * from product order by createdAt desc limit 10') as Promise<RowDataPacket[]>
  }

  public static getTopDiscountProducts(): Promise<RowDataPacket[]> {
    return db.query('select * from product where discount >= 75 order by discount desc limit 10') as Promise<RowDataPacket[]>
  }

  public static getByCategory(categoryId: number): Promise<RowDataPacket[]> {
    return db.query('select\n' +
      '       p.*\n' +
      'from product_and_category\n' +
      'left join product p on product_and_category.productId = p.id\n' +
      'where categoryId = ?;', [categoryId]) as Promise<RowDataPacket[]>
  }
}

export default Product
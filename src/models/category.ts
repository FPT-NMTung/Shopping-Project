import {RowDataPacket} from "mysql2";
import db from "../config/database";

class Category {
  public static getAllCategories(): Promise<RowDataPacket[]> {
    return db.execute('select\n' +
      '       category.*,\n' +
      '       COUNT(productId) \'quantity\'\n' +
      'from category\n' +
      'right join product_and_category pac on category.id = pac.categoryId\n' +
      'group by category.id;'
    ) as Promise<RowDataPacket[]>
  }

  public static getTopCategories(limit: number): Promise<RowDataPacket[]> {
    return db.execute('select\n' +
      '       category.*,\n' +
      '       COUNT(productId) \'quantity\'\n' +
      'from category\n' +
      'right join product_and_category pac on category.id = pac.categoryId\n' +
      'group by category.id\n' +
      'order by quantity desc limit ?;', [limit.toString()]) as Promise<RowDataPacket[]>
  }

  public static getCategoryWithProductId(id: number): Promise<RowDataPacket[]> {
    return db.execute('select\n' +
      '       c.*\n' +
      'from product_and_category\n' +
      'join category c on c.id = product_and_category.categoryId\n' +
      'where productId = ?;'
    ,[id]) as Promise<RowDataPacket[]>
  }
}
export default Category
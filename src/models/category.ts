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

}
export default Category
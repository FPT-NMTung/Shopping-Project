import {RowDataPacket} from "mysql2";
import db from "../config/database";

class Category {
  public static getAllCategories(): Promise<RowDataPacket[]> {
    return db.execute('select * from category') as Promise<RowDataPacket[]>
  }

  public static getTopCategories(limit: number): Promise<RowDataPacket[]> {
    return db.execute('select category.id,\n' +
      '       category.name,\n' +
      '       category.createdAt,\n' +
      '       category.updatedAt,\n' +
      '       count(productId) \'quantity\'\n' +
      'from category\n' +
      '         left join product_and_category pac on category.id = pac.categoryId\n' +
      'group by category.id\n' +
      'order by quantity desc\n' +
      'limit ?', [limit.toString()]) as Promise<RowDataPacket[]>
  }

}
export default Category
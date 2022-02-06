import {RowDataPacket} from "mysql2";
import db from "../config/database";
import Address from "./address";

class Category {

  public static getAllCategories(): Promise<RowDataPacket[]> {
    return db.execute('select * from category') as Promise<RowDataPacket[]>
  }
}
export default Category
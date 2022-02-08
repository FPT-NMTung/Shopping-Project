import {RowDataPacket} from "mysql2";
import db from '../config/database';

class Favorite {
  public static getAllFavouritesById(userId : number): Promise<RowDataPacket[]> {
  return db.execute('select * from favorite where userId = ?',[userId]) as Promise<RowDataPacket[]>;
  }
}

export default Favorite;

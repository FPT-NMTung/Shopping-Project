import {RowDataPacket} from "mysql2";
import db from '../config/database';

class Favorite {
  public static getAllFavouritesById(userId : number): Promise<RowDataPacket[]> {
  return db.execute('select ' +
    '       p.*\n' +
    'from favorite\n' +
    '         left join product p on p.id = favorite.productId\n' +
    'where userId = ?;',[userId]) as Promise<RowDataPacket[]>;
  }

  public static favoriteDelete(productId : number,userId : number): Promise<RowDataPacket[]> {
    return db.execute('delete from favorite where productId = ? and userId = ?',[productId, userId]) as Promise<RowDataPacket[]>;
  }

  public static getFavoriteByProductId(productId : number, userId : number): Promise<RowDataPacket[]> {
    return db.execute('select * from favorite where productId = ? and userId = ?', [productId, userId]) as Promise<RowDataPacket[]>;
  }

  public static favoriteAdd(userId : number, productId : number): Promise<RowDataPacket[]> {
    return db.execute('insert into favorite(userId, productId) values (?,?)',[userId, productId])as Promise<RowDataPacket[]>;
  }

  public static checkFavorite(userId: number, productId: number): Promise<RowDataPacket[]> {
    return db.execute('select * from favorite where userId = ? and productId = ?',
      [userId, productId]) as Promise<RowDataPacket[]>;
  }
}

export default Favorite;

import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class SearchHistory {
  constructor() {
  }

  public static addHistory(userId: string, query: string): Promise<RowDataPacket[]> {
    return db.query('INSERT INTO search_history (userId, value) VALUES (?, ?)',
      [userId, query]) as Promise<RowDataPacket[]>
  }
}

export default SearchHistory
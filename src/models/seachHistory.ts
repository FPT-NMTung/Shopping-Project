import db from '../config/database'
import {RowDataPacket} from 'mysql2'

class SearchHistory {
  constructor() {
  }

  public static addHistory(userId: string, query: string): Promise<RowDataPacket[]> {
    const createdAt = new Date()
    const updatedAt = new Date()

    return db.query('INSERT INTO search_history (userId, value, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [userId, query, createdAt, updatedAt]) as Promise<RowDataPacket[]>
  }
}

export default SearchHistory
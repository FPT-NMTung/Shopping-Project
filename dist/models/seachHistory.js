"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class SearchHistory {
    constructor() {
    }
    static addHistory(userId, query) {
        const createdAt = new Date();
        const updatedAt = new Date();
        return database_1.default.query('INSERT INTO search_history (userId, value, createdAt, updatedAt) VALUES (?, ?, ?, ?)', [userId, query, createdAt, updatedAt]);
    }
}
exports.default = SearchHistory;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class Product {
    constructor() {
    }
    static getAll() {
        return database_1.default.execute('select * from product');
    }
    static search(query, limit) {
        return database_1.default.query(`select * from product where name like ? limit ?`, [`%${query}%`, limit]);
    }
}
exports.default = Product;

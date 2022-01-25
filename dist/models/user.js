"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class User {
    constructor() {
    }
    static getByEmail(email) {
        return database_1.default.execute('select * from user where email = ?', [email]);
    }
    static getById(id) {
        return database_1.default.execute('select * from user where id = ?', [id]);
    }
    static createUser(name, email, password, activeCode) {
        const createdAt = new Date();
        const updatedAt = new Date();
        // after 15 minutes, the active code will be expired
        const expiredAt = new Date(createdAt.getTime() + 15 * 60 * 1000);
        return database_1.default.execute('insert into user (email, password, name, createdAt, updatedAt, codeActive, expCodeActive) values (?, ?, ?, ?, ?, ?, ?)', [email, password, name, createdAt, updatedAt, activeCode, expiredAt]);
    }
    static active(id) {
        return database_1.default.execute('update user set codeActive = NULL, expCodeActive = NULL where id = ?', [id]);
    }
    static changePassword(id, password) {
        return database_1.default.execute('update user set password = ? where id = ?', [password, id]);
    }
}
exports.default = User;

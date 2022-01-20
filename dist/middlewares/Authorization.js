"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthorizationRouter = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const token = tokenHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, 'nmtungofficial');
    }
    catch (e) {
        res.status(401).json({
            message: 'Not authenticated'
        });
        return;
    }
    next();
};
exports.default = AuthorizationRouter;

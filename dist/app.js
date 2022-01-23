"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '2mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/', userRouter_1.default);
app.use('/', productRouter_1.default);
app.use('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to my API :) this is documentation for the API: https://documenter.getpostman.com/view/15242317/UVXetJnL'
    });
});
app.listen(process.env.HOST || 5000, () => {
    console.log('---=== Server started ===---');
});

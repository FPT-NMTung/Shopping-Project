"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const commonFunction_1 = __importDefault(require("../common/commonFunction"));
const product_1 = __importDefault(require("../models/product"));
const seachHistory_1 = __importDefault(require("../models/seachHistory"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProductController {
}
_a = ProductController;
ProductController.getAllProduct = async (req, res) => {
    const [data] = await product_1.default.getAll();
    return res.status(200).json(data);
};
ProductController.searchProduct = async (req, res) => {
    let query = req.query.query;
    let limit = Number.parseInt(req.query.limit);
    query = (0, commonFunction_1.default)({
        input: query,
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 50
    });
    limit = (0, commonFunction_1.default)({
        input: limit,
        type: 'number',
        required: true,
        min: 1,
        max: 50
    });
    if (query === null || limit === null) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }
    const [data] = await product_1.default.search(query, limit);
    if (req.headers.authorization) {
        const tokenPayLoad = jsonwebtoken_1.default.verify(req.headers.authorization.split(' ')[1], 'nmtungofficial');
        await seachHistory_1.default.addHistory(tokenPayLoad['id'], query);
    }
    return res.status(200).json({
        message: 'Get products success',
        result: data
    });
};
exports.default = ProductController;

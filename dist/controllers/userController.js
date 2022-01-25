"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commonFunction_1 = __importDefault(require("../common/commonFunction"));
const templateActiveCode_1 = __importDefault(require("../common/templateActiveCode"));
const mailManager_1 = __importDefault(require("../config/mailManager"));
class UserController {
}
_a = UserController;
UserController.signUp = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    email = (0, commonFunction_1.default)({
        input: email,
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 300
    });
    password = (0, commonFunction_1.default)({
        input: password,
        type: 'string',
        required: true,
        minLength: 8,
        maxLength: 50,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    });
    if (email === null || password === null) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }
    const [searchUser] = await user_1.default.getByEmail(email);
    if (searchUser.length > 0) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }
    const randomActiveCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const activeCode = Array.from(Array(8).keys()).map(i => randomActiveCode[Math.floor(Math.random() * randomActiveCode.length)]).join('');
    const hashPassword = await bcrypt_1.default.hash(password, 12);
    await user_1.default.createUser(email.split('@')[0], email, hashPassword, activeCode);
    // send email
    const content = {
        to: [email],
        from: 'nmtung.temp@gmail.com',
        fromname: 'Shopping | Project',
        subject: 'Active code | Shopping',
        text: 'Active code | Shopping',
        html: (0, templateActiveCode_1.default)(email, activeCode)
    };
    mailManager_1.default.sendMail(content, function (err, a) {
        if (err) {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    });
    return res.status(200).json({
        message: 'User created'
    });
};
UserController.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    email = (0, commonFunction_1.default)({
        input: email,
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 300
    });
    password = (0, commonFunction_1.default)({
        input: password,
        type: 'string',
        required: true,
        minLength: 8,
        maxLength: 50,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    });
    if (email === null || password === null) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }
    const [searchUser] = await user_1.default.getByEmail(email);
    if (searchUser.length === 0) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, searchUser[0].password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: searchUser[0].id,
        email: searchUser[0].email,
        name: searchUser[0].name
    }, 'nmtungofficial');
    return res.status(200).json({
        message: 'Login success',
        token: token
    });
};
UserController.active = async (req, res) => {
    let userId = req.body.userId;
    let activeCode = req.body.code;
    userId = (0, commonFunction_1.default)({
        input: userId,
        type: 'number',
        required: true
    });
    activeCode = (0, commonFunction_1.default)({
        input: activeCode,
        type: 'string',
        required: true,
        minLength: 8,
        maxLength: 8
    });
    if (userId === null || activeCode === null) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }
    const [searchUser] = await user_1.default.getById(userId);
    if (searchUser.length === 0) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    if (searchUser[0].codeActive === null) {
        return res.status(409).json({
            message: 'User already active'
        });
    }
    if (searchUser[0].codeActive !== activeCode) {
        return res.status(401).json({
            message: 'Invalid active code'
        });
    }
    if (searchUser[0].expCodeActive < Date.now()) {
        return res.status(401).json({
            message: 'Active code expired'
        });
    }
    await user_1.default.active(userId);
    return res.status(200).json({
        message: 'Active success'
    });
};
UserController.changePassword = async (req, res) => {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const payload = jsonwebtoken_1.default.verify(token, 'nmtungofficial');
    const userId = payload['id'];
    let password = req.body.password;
    password = (0, commonFunction_1.default)({
        input: password,
        minLength: 8,
        maxLength: 50,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        required: false,
        type: 'string'
    });
    if (password === null) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }
    const hashPassword = await bcrypt_1.default.hash(password, 12);
    await user_1.default.changePassword(userId, hashPassword);
    return res.status(200).json({
        message: 'Change password success'
    });
};
UserController.getInformation = async (req, res) => {
    let userId = Number.parseInt(req.query.id);
    userId = (0, commonFunction_1.default)({
        input: userId,
        required: false,
        type: 'number',
    });
    let [data] = await user_1.default.getById(userId);
    if (data.length === 0) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    let temp = Object.assign({}, data)['0'];
    delete temp.password;
    delete temp.codeActive;
    delete temp.expCodeActive;
    return res.status(200).json({
        message: 'Get information success',
        data: temp,
    });
};
exports.default = UserController;

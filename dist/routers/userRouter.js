"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
const router = express_1.default.Router();
router.post('/user/sign-up', userController_1.default.signUp);
router.post('/user/login', userController_1.default.login);
router.post('/user/active', userController_1.default.active);
router.post('/user/change-password', Authorization_1.default, userController_1.default.changePassword);
router.get('/user/get-user-info', userController_1.default.getInformation);
exports.default = router;

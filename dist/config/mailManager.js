"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sgTransport = require('nodemailer-sendgrid-transport');
const option = {
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    },
};
const SendMail = nodemailer_1.default.createTransport(sgTransport(option));
exports.default = SendMail;

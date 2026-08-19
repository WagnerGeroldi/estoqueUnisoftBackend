"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
exports.transporter = nodemailer_1.default.createTransport({
    service: process.env.SERVICE_EMAIL,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PWD_EMAIL,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.sendotpusername,
        pass: process.env.sendotppassword,
    },
});

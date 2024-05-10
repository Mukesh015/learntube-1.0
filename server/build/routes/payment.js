"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentRouter = express_1.default.Router();
const payment_1 = require("../controllers/payment");
PaymentRouter.post("/makepayment", payment_1.makePayment);
PaymentRouter.post("/webhook", express_1.default.raw({ type: 'application/json' }), payment_1.makePayment);
exports.default = PaymentRouter;

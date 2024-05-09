"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const stripe = require('stripe')(process.env.stripe_secret);
function makePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { courseDetails } = req.body;
        try {
            const lineItems = {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: 'Student'
                    },
                    unit_amount: 1000000,
                },
                quantity: 1,
            };
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [lineItems],
                mode: "payment",
                success_url: `${process.env.client_domain}/payment/success`,
                cancel_url: `${process.env.client_domain}/payment/failed`,
            });
            res.send({ id: session.id });
        }
        catch (error) {
            console.error('Error creating Checkout session:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
exports.makePayment = makePayment;

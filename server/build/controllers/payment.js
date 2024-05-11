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
exports.webHook = exports.makePayment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const stripe = require('stripe')(process.env.stripe_secret);
const endpointSecret = process.env.webhook_secret;
function makePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { courseDetails } = req.body;
        try {
            const lineItems = courseDetails.map((detail) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: detail.courseName,
                        description: detail.courseDescription,
                        images: [detail.courseThumbnail]
                    },
                    unit_amount: parseInt(detail.courseFees) * 100,
                },
                quantity: 1,
            }));
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${process.env.client_domain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.client_domain}/payment/failed`,
                customer_email: 'sudip2003kundu@gmail.com',
                client_reference_id: 5400,
            });
            res.json({ url: session.url });
        }
        catch (error) {
            console.error('Error creating Checkout session:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
exports.makePayment = makePayment;
function webHook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let event = req.body;
        if (endpointSecret) {
            const signature = req.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
            }
            catch (error) {
                console.log(`⚠️  Webhook signature verification failed.`, error);
                return res.sendStatus(400);
            }
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        res.send();
    });
}
exports.webHook = webHook;

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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_1 = __importDefault(require("./routes/video"));
const static_1 = __importDefault(require("./routes/static"));
const feature_1 = __importDefault(require("./routes/feature"));
const payment_1 = __importDefault(require("./routes/payment"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_1 = __importDefault(require("./graphql"));
dotenv_1.default.config({ path: "./.env" });
const stripe = require('stripe')(process.env.stripe_secret);
const endpointSecret = "whsec_HE0gOF31VbdOno14SqmGP2KGQaN28oMS";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const DB = process.env.DB;
        const PORT = process.env.PORT;
        if (!DB || !PORT) {
            console.error("Environment variables DB and PORT must be provided.");
            return;
        }
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)()));
        app.use("/api", static_1.default);
        app.use("/video", video_1.default);
        app.use("/features", feature_1.default);
        app.use("/pay", payment_1.default);
        app.post('/webhook', express_1.default.raw({ type: 'application/json' }), (request, response) => {
            const sig = request.headers['stripe-signature'];
            console.log("webhook executed successfully");
            let event;
            try {
                event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            }
            catch (err) {
                response.status(400).send(`Webhook Error: ${err}`);
                return;
            }
            switch (event.type) {
                case 'checkout.session.async_payment_failed':
                    const checkoutSessionAsyncPaymentFailed = event.data.object;
                    console.log('paymentFailed', checkoutSessionAsyncPaymentFailed);
                    break;
                case 'checkout.session.async_payment_succeeded':
                    const checkoutSessionAsyncPaymentSucceeded = event.data.object;
                    // Then define and call a function to handle the event checkout.session.async_payment_succeeded
                    console.log('Checkout async payment succeeded', checkoutSessionAsyncPaymentSucceeded);
                    break;
                case 'checkout.session.completed':
                    const checkoutSessionCompleted = event.data.object;
                    // Then define and call a function to handle the event checkout.session.completed
                    console.log('Checkout async checkoutSessionCompleted', checkoutSessionCompleted);
                    break;
                case 'checkout.session.expired':
                    const checkoutSessionExpired = event.data.object;
                    // Then define and call a function to handle the event checkout.session.expired
                    console.log('checkout session expired', checkoutSessionExpired);
                    break;
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
            // Return a 200 response to acknowledge receipt of the event
            response.send();
        });
        try {
            yield mongoose_1.default.connect(DB);
            console.log("DB connected");
        }
        catch (error) {
            console.log("DB connection failed", error);
        }
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
    });
}
init();

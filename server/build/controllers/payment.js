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
        const { courseDetails, userName, email } = req.body;
        console.log(email);
        try {
            const price = yield stripe.prices.create({
                currency: 'inr',
                unit_amount: parseInt(courseDetails[0].courseFees) * 100,
                product_data: {
                    name: courseDetails[0].courseName,
                },
                metadata: {
                    description: courseDetails[0].courseId,
                    images: `${courseDetails[0].courseThumbnail}`
                }
            });
            const customer = yield stripe.customers.create({
                name: userName,
                email: email,
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [{
                        price: price.id,
                        quantity: 1,
                    }],
                mode: "payment",
                success_url: `${process.env.client_domain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.client_domain}/payment/failed`,
                billing_address_collection: 'required',
                customer: customer.id,
                client_reference_id: courseDetails[0].courseId,
                metadata: {
                    courseId: courseDetails[0].courseId
                }
            });
            res.status(200).json({
                status: 'success',
                session
            });
        }
        catch (error) {
            console.error('Error creating Checkout session:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
exports.makePayment = makePayment;
;
/*
const createBookingCheckout = async (sessionData: { metadata: { courseId: any; }; client_reference_id: any; customer:any }) => {
  console.log(sessionData.metadata);
  console.log(sessionData.client_reference_id);
  console.log(sessionData.customer);
};

export async function webhookCheckout (req: Request, res: Response)  {
  console.log("hi")
  const endpointSecret = process.env.WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      console.log('Checkout async payment succeeded')
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;

      console.log('Checkout async checkoutSessionCompleted',checkoutSessionCompleted)

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

*/ 

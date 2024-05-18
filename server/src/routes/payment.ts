import express from 'express';
const PaymentRouter = express.Router();

import {makePayment,webhookCheckout} from '../controllers/payment'


PaymentRouter.post("/makepayment", makePayment)
PaymentRouter.post("/webhook",express.raw({type: 'application/json'}), webhookCheckout)


export default PaymentRouter;

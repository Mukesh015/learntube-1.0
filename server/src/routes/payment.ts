import express from 'express';
const PaymentRouter = express.Router();

import {makePayment,webHook} from '../controllers/payment'


PaymentRouter.post("/makepayment", makePayment)
PaymentRouter.post("/webhook",express.raw({type: 'application/json'}), makePayment)


export default PaymentRouter;

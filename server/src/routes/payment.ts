import express from 'express';
const PaymentRouter = express.Router();

import {makePayment} from '../controllers/payment'


PaymentRouter.post("/makepayment", makePayment)



export default PaymentRouter;

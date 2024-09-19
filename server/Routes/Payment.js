import { Router } from "express";
import paymentCntrl from "../Controllers/Payment.js";
import { Auth, onlyAcessTOStudent } from "../Middlewares/auth.js";

const payment = Router();

// ================ payement Routes ====================
payment.post(
  "/caputrePayment",
  Auth,
  onlyAcessTOStudent,
  paymentCntrl.caputrePayment
);
payment.post("/verifyPayment", paymentCntrl.verifySignature);

export default payment;

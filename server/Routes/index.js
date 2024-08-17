import { Router } from "express";
import AuthController from "../Controllers/AuthCntrl.js";
import resetPassCntrl from "../Controllers/ResetPassword.js";
import { Auth } from "../Middlewares/auth.js";
const router = Router();

//============== auth Routes ========
router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
router.post("/sendotp", AuthController.sendOTP);
router.put("/changePassword", Auth, AuthController.changePassword);

//================= reset pass Routes ========
router.post("/reset-password-token", resetPassCntrl.resetPassToken);
router.post("/reset-password", resetPassCntrl.resetPassword);

export default router;

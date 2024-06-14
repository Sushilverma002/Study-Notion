import UsersModel from "../Models/Users.js";
import jwt from "jsonwebtoken";
import mailSender from "../Utilities/mailer.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();

const resetPassCntrl = Object();
const saltRounds = 15;

resetPassCntrl.resetPassToken = async (req, res) => {
  try {
    //step 1 : get an email from req
    const email = req.body;
    //step 2 : check wheather user is vaild or not
    const user = await UsersModel.findOne({ email: email });

    if (!user) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "user not exist.",
        function (response) {
          res.json(response);
        }
      );
    }

    //step 3 : token genratation
    const token = crypto.randomUUID();

    //step 4 : update user by adding expiration time and token
    const updatedDeatils = await UsersModel.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpire: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    //step 5 : create url
    const url = `https://localhost:3000/update-password/${token}`;
    //step 6 : send mail contating url
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link : ${url}`
    );
    //step 7 : return response
    apiResponseHandler.sendResponse(
      200,
      true,
      "Email sent successfully, Please check your email and change password.",
      function (response) {
        res.json(response);
      }
    );
  } catch (error) {
    console.log("error", error);
    apiResponseHandler.sendResponse(
      500,
      false,
      "Something went wrong, while reseting the password.",
      function (response) {
        res.json(response);
      }
    );
  }
};

//reset the password
resetPassCntrl.resetPassword = async (req, res) => {
  try {
    //step 1 : req body fetch
    //token -> coming from frontend side that's why we say req ki body se

    const { password, confirmPassword, token } = req.body;
    //step 2 : check validation

    if (password !== confirmPassword) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Password and confrim password not matched, Please try again.",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 3 : get userdeatil from db
    const userDeatil = await UsersModel.findOne({ token: token });
    //step 4 : if no enrty then -invalid token
    if (!userDeatil) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Invaild token, please check once.",
        function (response) {
          res.json(response);
        }
      );
    }
    //*token time check
    if (userDeatil.resetPasswordExpire < Date.now()) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Entered token is expired, please regenrate your token.",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 5 : create enrty in db wiht hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UsersModel.updateOne(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    //step 6 : send response
    apiResponseHandler.sendResponse(
      200,
      true,
      "Password reset successfully.",
      function (response) {
        res.json(response);
      }
    );
  } catch (error) {}
};
export default resetPassCntrl;

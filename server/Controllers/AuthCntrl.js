import UsersModel from "../Models/Users.js";
import OTPModel from "../Models/OTP.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import optGenerator from "otp-generator";
import bcrypt from "bcrypt";
import ProfileModel from "../Models/Profile.js";
import jwt from "jsonwebtoken";
import mailSender from "../Utilities/mailer.js";
import { config } from "dotenv";
import passwordUpdate from "../Utilities/mailTemplates/passwordUpdate.js";
config();

const AuthController = Object();
const saltRounds = 15;
//send OTP
// function getRandomNumber(req, res) {
//   return Math.random();
// }
AuthController.sendOTP = async (req, res) => {
  try {
    //step 1 -> fetch email from body;
    const { email } = req.body;
    //step 2 ->Check wheather user exist
    const IsExists = await UsersModel.findOne({ email });

    if (IsExists) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "User already exisit, Please try with login!!",
        function (response) {
          res.json(response);
        }
      );
    } else {
      //step 3->  otp creation/genration
      var otpNumber = optGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const result = await OTPModel.findOne({ otp: otpNumber });
      console.log("Result is Generate OTP Func");
      console.log("OTP", otpNumber);
      console.log("Result", result);

      //step 4: check otp is UNIQUE
      while (result) {
        otpNumber = optGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
      }

      //step 5->storing that otp in db
      const OTPayload = { email, otp: otpNumber };
      const otpBody = await OTPModel.create(OTPayload);
      console.log("otp body:", otpBody);

      apiResponseHandler.sendResponseMsg(
        200,
        true,
        "Otp sent successfully",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("error while genrating the otp", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal Server Error",
      function (response) {
        res.json(response);
      }
    );
  }
};

//signUp

AuthController.signUp = async (req, res) => {
  try {
    //step 1 : take email ,name (full,last), password ,accountType, from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    // * all fields are not present
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType
    ) {
      return apiResponseHandler.sendError(
        403,
        false,
        "All fields are required",
        function (response) {
          res.json(response);
        }
      );
    }

    //* check wheather the password and confirm passwords are same
    if (password !== confirmPassword) {
      return apiResponseHandler.sendResponse(
        400,
        false,
        "Password and ConfirmPassword not matched, Please try again",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 2 : check wheather user already exisit or not
    const isExists = await UsersModel.findOne({ email });

    if (isExists) {
      return apiResponseHandler.sendError(
        400,
        false,
        "user already exists.",
        function (response) {
          res.json(response);
        }
      );
    }

    //** find most recent OTP sotred in the db.
    const recentOtp = await OTPModel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recent OTP", recentOtp);

    //**VAILDATE OTP

    //step 3: otp vaildation
    if (recentOtp.length == 0) {
      return apiResponseHandler.sendError(
        400,
        false,
        "The OTP is not valid",
        function (response) {
          res.json(response);
        }
      );
    } else if (otp !== recentOtp[0].otp) {
      return apiResponseHandler.sendError(
        400,
        false,
        "Invalid OTP",
        function (response) {
          res.json(response);
        }
      );
    }

    //step 4 : not then hash the password and
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileData = await ProfileModel.create({
      gender: null,
      dateOfbirth: null,
      about: null,
      contactNumber: null,
    });

    const userData = await UsersModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDeatils: profileData._id,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}${lastName}`,
    });
    console.log("User data", userData);
    userData.password = undefined;
    return apiResponseHandler.sendResponse(
      200,
      true,
      userData,
      function (response) {
        res.json(response);
      }
    );
  } catch (error) {
    console.log(error);
    apiResponseHandler.sendError(
      500,
      false,
      "internal sever error while sign up.",
      function (response) {
        res.json(response);
      }
    );
  }
};

//login
AuthController.login = async (req, res) => {
  try {
    //step 1 : req body data fetch email and password
    const { email, password } = req.body;

    //* data required
    if (!email || !password) {
      apiResponseHandler.sendResponse(
        403,
        false,
        "All fields are required, please try again.",
        function (response) {
          res.json(response);
        }
      );
    }

    const user = await UsersModel.findOne({ email }).populate(
      "additionalDeatils"
    );
    if (!user) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "user not exist, please do sign up first.",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 3 : compare passwords
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      };
      //step 4 : jwt token creation
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      // Save token to user document in database
      user.token = token;
      user.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      apiResponseHandler.sendResponse(200, true, user, function (response) {
        res.cookie("token", token, options);
        res.json(response);
      });
    } else {
      return apiResponseHandler.sendResponse(
        400,
        false,
        "password is incorrect.",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("error while login", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal server error, while login.",
      function (response) {
        res.json(response);
      }
    );
  }
};

// change password
AuthController.changePassword = async (req, res) => {
  try {
    // const userDetails = await UsersModel.findById(req.user.id);
    //step 1 : get data from req ki body -> oldPassword,newpassword,confirmNewpassword.
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    //step 2 : validation
    if (!newPassword || !confirmNewPassword || !oldPassword) {
      apiResponseHandler.sendResponse(
        403,
        false,
        "All fields are required, please try again.",
        function (response) {
          res.json(response);
        }
      );
    }
    if (newPassword !== confirmNewPassword) {
      apiResponseHandler.sendResponse(
        403,
        false,
        "password and confirm password not matched, Please try again.",
        function (response) {
          res.json(response);
        }
      );
    }
    //we are checking wheather old password matches from the password which is in db

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      //step 3 : update password in DB
      const updatedResult = await UsersModel.findOneAndUpdate(req.user.id, {
        password: hashedPassword,
      });

      //step 4 : send email passoword updated
      try {
        await mailSender(
          updatedResult.email,
          passwordUpdate(
            updatedResult.email,
            `Password updated successfully for ${updatedResult.firstName}${updatedResult.lastName}`
          )
        );
        console.log("Email sent successfully:", emailResponse.response);
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error);
        apiResponseHandler.sendError(
          400,
          false,
          " Error occurred while sending email",
          function (response) {
            res.json(response);
          }
        );
      }

      apiResponseHandler.sendResponse(
        200,
        true,
        "password updated successfully",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 5 : return response
  } catch (error) {
    console.log("error while changing password:", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal server error, while changing password.",
      function (response) {
        res.json(response);
      }
    );
  }
};
export default AuthController;

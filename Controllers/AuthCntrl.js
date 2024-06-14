import UsersModel from "../Models/Users.js";
import OTPModel from "../Models/OTP.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import optGenerator from "otp-generator";
import bcrypt from "bcrypt";
import ProfileModel from "../Models/Profile.js";
import jwt from "jsonwebtoken";
import mailSender from "../Utilities/mailer.js";
import { config } from "dotenv";
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
        400,
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

      //step 4: check otp is UNIQUE
      const result = await OTPModel.findOne({ otp: otpNumber });

      while (result) {
        otpNumber = optGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTPModel.findOne({ otp: otpNumber });
      }

      //step 5->storing that otp in db
      const OTPayload = { email, otpNumber };
      const otpBody = await OTPModel.create({ OTPayload });
      console.log(otpBody);

      apiResponseHandler.sendResponse(
        200,
        true,
        "OTP sent successfully",
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
      contactNumbwer,
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
      !contactNumbwer
    ) {
      apiResponseHandler.sendResponse(403, false, "All fields are required."),
        function (response) {
          res.json(response);
        };
    }

    //* check wheather the password and confirm passwords are same
    if (password !== confirmPassword) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Password and ConfirmPassword not matched, Please try again",
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

    if (recentOtp.length == 0) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "OTP not found",
        function (response) {
          res.json(response);
        }
      );
    } else if (otp !== recentOtp.otp) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Invalid OTP",
        function (response) {
          res.json(response);
        }
      );
    }

    //step 2 : check wheather user already exisit or not
    const isExists = await UsersModel.findOne({ email });

    if (isExists) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "user already exists.",
        function (response) {
          res.json(response);
        }
      );
    }
    //step 3: otp vaildation

    //step 4 : not then hash the password and
    const hashedPassword = bcrypt.hash(password, saltRounds);

    const profileData = await ProfileModel.create({
      gender: null,
      dateOfbirth: null,
      about: null,
      contactNumber: contactNumbwer,
    });
    //step 5 : create an entery into db
    const dataStoreDb = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDeatils: profileData._id,
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}${lastName}`,
    };

    const userData = await UsersModel.create({ dataStoreDb });
    console.log("User data", userData);
    apiResponseHandler.sendResponse(
      200,
      true,
      "user SignUp successfully.",
      function (response) {
        res.json(response);
      }
    );
  } catch (error) {
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
        role: user.accountType,
      };
      //step 4 : jwt token creation
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      apiResponseHandler.sendResponse(
        200,
        true,
        "user Login successfully.",
        function (response) {
          res.cookie("token", token, options);
          res.json(response);
        }
      );
    } else {
      apiResponseHandler.sendResponse(
        400,
        false,
        "password is incorrect.",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("erroe while login", error);
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
AuthController.changePassword(async (req, res) => {
  try {
    //step 1 : get data from req ki body -> oldPassword,newpassword,confirmNewpassword.
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    //step 2 : validation
    if (!email || !newPassword || !confirmNewPassword || !oldPassword) {
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

    //user exist or not
    const user = await UsersModel.findOne({ email });
    if (!user) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "user not found.",
        function (response) {
          res.json(response);
        }
      );
    }

    //we are checking wheather old password matches from the password which is in db

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      //step 3 : update password in DB
      const updatedResult = await UsersModel.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );
      if (updatedResult) {
        //step 4 : send email passoword updated
        await mailSender(
          email,
          "Password Update",
          "our password has been updated."
        );
        apiResponseHandler.sendResponse(
          200,
          true,
          "password updated successfully",
          function (response) {
            res.json(response);
          }
        );
      } else {
        apiResponseHandler.sendResponse(
          400,
          false,
          "password not updated, please try again.",
          function (response) {
            res.json(response);
          }
        );
      }
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
});
export default AuthController;

import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const Auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : req.body?.token;

    if (!token) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Access denied. Token not provided.",
        function (response) {
          res.json(response);
        }
      );
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      console.log(decode);
    } catch (error) {
      apiResponseHandler.sendResponse(
        401,
        false,
        "Invalid token. Please provide a valid token for authentication.",
        function (response) {
          return res.json(response);
        }
      );
    }
    return next();
  } catch (error) {
    console.log("error in auth middleware", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal Server Error",
      error,
      function (response) {
        res.json(response);
      }
    );
  }
};

//isadmin
const onlyAcessTOAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Access Denied,this is Protected route for ADMIN only.",
        function (response) {
          res.json(response);
        }
      );
    }
    return next();
  } catch (error) {
    console.log("error", error);
    apiResponseHandler.sendError(
      500,
      false,
      "something went wrong, User role can not be verified, please try again.",
      function (response) {
        res.json(response);
      }
    );
  }
};
//isstudent
const onlyAcessTOStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Access Denied,this is Protected route for STUDENT only.",
        function (response) {
          res.json(response);
        }
      );
    }
    return next();
  } catch (error) {
    console.log("error", error);
    apiResponseHandler.sendError(
      500,
      false,
      "something went wrong, User role can not be verified, please try again.",
      function (response) {
        res.json(response);
      }
    );
  }
};
//isInstructor
const onlyAcessTOInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Access Denied,this is Protected route for INSTRUCTOR only.",
        function (response) {
          res.json(response);
        }
      );
    }
    return next();
  } catch (error) {
    console.log("error", error);
    apiResponseHandler.sendError(
      500,
      false,
      "something went wrong, User role can not be verified, please try again.",
      function (response) {
        res.json(response);
      }
    );
  }
};

export { Auth, onlyAcessTOAdmin, onlyAcessTOInstructor, onlyAcessTOStudent };

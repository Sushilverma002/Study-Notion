"use strict";
import statusCodeMsg from "../Utilities/statusCodeMessage.js";

const responseHandler = {
  sendResponse: function (codeRes, statusRes, resultRes, cb) {
    if (statusRes) {
      cb({
        code: codeRes,
        message: statusCodeMsg[codeRes],
        status: statusRes,
        results: resultRes,
      });
    } else {
      cb({
        code: codeRes,
        message: statusCodeMsg[codeRes],
        status: statusRes,
      });
    }
  },

  sendError: function (codeRes, statusRes, errMessage, cb) {
    cb({
      code: codeRes,
      message: errMessage,
      status: statusRes,
    });
  },

  sendResponseMsg: function (codeRes, statusRes, message, cb) {
    cb({
      code: codeRes,
      message: message,
      status: statusRes,
    });
  },
};

export default responseHandler;

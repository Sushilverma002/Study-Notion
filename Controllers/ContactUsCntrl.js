import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import mailSender from "../Utilities/mailer.js";

const contactUs = async (req, res) => {
  try {
    //fetch data
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    const mailSendToPerson = await mailSender(
      email,
      "Thanks for contact Us : StudyHub",
      message
    );
    const fullInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    };
    const mailSendToStudyHub = await mailSender(
      "sushilvarma9911@gmail.com",
      `Contact us by${firstName + lastName}`,
      fullInfo
    );

    if (mailSendToPerson && mailSendToStudyHub) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "Mail sent to user and Admin.",
        function (response) {
          res.json(response);
        }
      );
    } else {
      apiResponseHandler.sendError(
        200,
        false,
        "Mail not sent to user and Admin.",
        function (response) {
          res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("some error occured", error);
    apiResponseHandler.sendResponse(
      500,
      false,
      "Something went wrong, internal sever error.",
      function (response) {
        res.json(response);
      }
    );
  }
};

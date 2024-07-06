import instance from "../Config/RazorpayConfig.js";
import courseModel from "../Models/Course.js";
import userModel from "../Models/Users.js";
import mailSender from "../Utilities/mailer.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import mongoose from "mongoose";
const paymentCntrl = Object();

//caputre the payment and initate the  razorpay order
paymentCntrl.caputrePayment = async (req, res) => {
  try {
    //get courseID and UserId
    const { courseId } = req.body;
    const userId = req.user.id;
    // vaildation

    //courseID and userID is vaild
    if (!courseId) {
      apiResponseHandler.sendError(
        400,
        false,
        "Please provide vaild course ID.",
        function (response) {
          res.json(response);
        }
      );
    }

    //course vaild in the db
    let course;
    try {
      course = await courseModel.findById(courseId);
      if (!course) {
        apiResponseHandler.sendError(
          400,
          false,
          "Could not find the course.",
          function (response) {
            res.json(response);
          }
        );
      }

      // either the same user haven't purcased course earlier
      const uid = mongoose.Types.ObjectId(userId); //we have convert srting into object
      if (course.studentsEnrolled.include(uid)) {
        apiResponseHandler.sendResponse(
          200,
          false,
          "Student is already enrolled",
          function (response) {
            res.json(response);
          }
        );
      }
    } catch (error) {
      console.log("error occured:", error);
      apiResponseHandler.sendError(
        500,
        false,
        "Internal Server Error: An unexpected error occurred while processing your request.",
        (response) => {
          res.json(response);
        }
      );
    }
    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course.id,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(options);

      const result = {
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      };

      apiResponseHandler.sendResponse(200, true, result, function (response) {
        res.json(response);
      });
    } catch (error) {
      console.log("error occured:", error);
      apiResponseHandler.sendError(
        500,
        false,
        "Internal Server Error: An unexpected error occurred while processing your request.",
        (response) => {
          res.json(response);
        }
      );
    }
    // return response
  } catch (error) {
    console.log("error occured:", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal Server Error: An unexpected error occurred while processing your request.",
      (response) => {
        res.json(response);
      }
    );
  }
};

paymentCntrl.verifySignature = async (req, res) => {
  try {
    const webhookSecret = "123456789";

    const signature = req.header["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
      console.log("payement is Authorized.");

      const { courseId, userId } = rew.body.payload.payment.entity.notes;

      try {
        //fulfil the action

        //find the course and enroll the student in it
        const enrolledCourse = await courseModel.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        if (!enrolledCourse) {
          apiResponseHandler.sendError(
            500,
            false,
            "Course Not found",
            function (response) {
              res.jsonR(response);
            }
          );
        }

        console.log(enrolledCourse);

        //find the student andadd the course to their list enrolled courses me
        const enrolledStudent = await userModel.findOneAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );

        console.log(enrolledStudent);

        //mail send krdo confirmation wala
        const emailResponse = await mailSender(
          enrolledStudent.email,
          "Congratulations from CodeHelp",
          "Congratulations, you are onboarded into new CodeHelp Course"
        );
        console.log(emailResponse);

        apiResponseHandler.sendResponse(
          200,
          true,
          "signature verified",
          function (response) {
            res.json(response);
          }
        );
      } catch (error) {
        console.log("error occured:", error);
        apiResponseHandler.sendError(
          500,
          false,
          "Internal Server Error: An unexpected error occurred while processing your request.",
          (response) => {
            res.json(response);
          }
        );
      }
    }
  } catch (error) {
    console.log("error occured:", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Internal Server Error: An unexpected error occurred while processing your request.",
      (response) => {
        res.json(response);
      }
    );
  }
};
export default paymentCntrl;

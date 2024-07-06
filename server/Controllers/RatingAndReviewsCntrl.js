import RatingAndReviewModel from "../Models/RatingAndReviews.js";
import courseModel from "../Models/Course.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import mongoose from "mongoose";

const ratingAndReviewsCntrl = Object();

//create rating
ratingAndReviewsCntrl.createRating = async (req, res) => {
  try {
    //fetch from req.body
    const { rating, review, courseId } = req.body;

    //user id
    const userId = req.user.id;
    // vaildation
    if (!rating || !review || !courseId) {
      apiResponseHandler.sendError(
        400,
        false,
        "All fields are required",
        function (response) {
          res.json(response);
        }
      );
    }
    // check wheather user is enrolled in the course or not
    const courseDetail = await courseModel.findOne(
      { _id: courseId },
      { studentsEnrolled: { $elemMatch: { $eq: userId } } }
    );

    if (!courseDetail) {
      apiResponseHandler.sendError(
        404,
        false,
        "Course Not Found!!",
        function (response) {
          res.json(response);
        }
      );
    }

    //wheather user not review course earlier
    const alreadyReviewd = await RatingAndReviewModel.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewd) {
      apiResponseHandler.sendError(
        403,
        false,
        "Course is Already reviewed.",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // db insert in rating&rev model
      const ratingDeatils = await RatingAndReviewModel.create({
        rating: rating,
        review: review,
        course: courseId,
      });

      // rating id update in course model
      const updateCourseDeatil = await courseModel.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            ratingAndReviews: ratingDeatils._id,
          },
        },
        { new: true }
      );
      if (updateCourseDeatil) {
        console.log(updateCourseDeatil);
        apiResponseHandler.sendResponse(
          200,
          true,
          "Rating and Review created Successfully.",
          function (response) {
            res.json(response);
          }
        );
      } else {
        apiResponseHandler.sendError(
          400,
          false,
          "Rating and Review not created Successfully.",
          (response) => {
            res.json(response);
          }
        );
      }
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

// get average rating
ratingAndReviewsCntrl.getAvgRating = async (req, res) => {
  try {
    //get courseid
    const courseId = req.body.courseId;

    //calculate the avg
    const result = await RatingAndReviewModel.aggregate([
      {
        $match: {
          //conversion of  string into the object id
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const finalResult = {
      averageRating: result[0].averageRating,
    };
    if (result.length > 0) {
      apiResponseHandler.sendResponse(
        200,
        true,
        finalResult,
        function (response) {
          res.json(response);
        }
      );
    } else {
      apiResponseHandler.sendResponse(
        200,
        true,
        "Average Rating is 0, no rating given till now",
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
};
//get all rating

ratingAndReviewsCntrl.getAllRating = async (req, res) => {
  try {
    //fetch courseid
    const allReviews = await ratingAndReviewsCntrl
      .find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName image email",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    apiResponseHandler.sendResponse(200, true, allReviews, function (response) {
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
};

export default ratingAndReviewsCntrl;

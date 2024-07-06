import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import courseModel from "../Models/Course.js";
import categoryModel from "../Models/Category.js";
import userModel from "../Models/Users.js";
import uploadImageToCloudinary from "../Utilities/imgUploader.js";
import cloudinaryConnect from "../Config/cloudinaryConfig.js";
import { config, populate } from "dotenv";
config();
const courseCntrl = Object();

courseCntrl.createCourse = async (req, res) => {
  try {
    // data fetch
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
    // file path
    const thumbnail = req.files.thumbnailImage; //files ->folder, thumbnail -> key
    // vaildation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "all fields are required, Please fill all details",
        function (response) {
          res.json(response);
        }
      );
    }

    // instructor->db call why again ?->because in are schema we need instructor object id so for that we need that id.
    const userId = req.user.id;
    const instructorDeatils = await userModel.findById(userId);
    console.log("Instructor Details: ", instructorDeatils);

    if (!instructorDeatils) {
      apiResponseHandler.sendResponse(
        404,
        false,
        "Instructor Details not found",
        function (response) {
          res.json(response);
        }
      );
    }
    // tag val

    const categoryDetails = await categoryModel.findById(category);

    if (!categoryDetails) {
      apiResponseHandler.sendResponse(
        404,
        false,
        "Instructor Details not found",
        function (response) {
          res.json(response);
        }
      );
    }

    // image cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDERNAME
    );
    // create course db
    const newCourse = await courseModel.create({
      courseName,
      courseDescription,
      instructor: instructorDeatils._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // as a instrcutor all courses created by him self should be shown so need to store in db(user schema)
    await userModel.findByIdAndUpdate(
      { _id: instructorDeatils._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // add course entry in category
    await categoryModel.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    // response
    apiResponseHandler.sendResponse(200, true, newCourse, function (response) {
      res.json(response);
    });
  } catch (error) {
    console.log("error occur:", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Something went wrong, Internal server error",
      function (response) {
        res.json(response);
      }
    );
  }
};

courseCntrl.getAllCourse = async (req, res) => {
  try {
    const allCourses = await courseModel.find({});

    if (allCourses) {
      apiResponseHandler.sendResponse(
        200,
        true,
        allCourses,
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code if coursese are not found.
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To get course detail!",
        (response) => {
          res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("error occured : ", error);
    apiResponseHandler.sendError(
      500,
      false,
      "Something went wrong, Internal server error",
      function (response) {
        res.json(response);
      }
    );
  }
};

//getCourseDeatils
courseCntrl.getCourseDetail = async (req, res) => {
  try {
    //course_id fetch
    const { courseId } = req.body;

    //db call for finding data realted to course_id
    const courseDetails = await courseModel
      .find({ _id: courseId })
      //basically we are replacing the objectID crosspoding to there data.
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDeatils",
        },
      })
      .populate("category")
      // .populate("RatingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //vaidation
    if (!courseDetails) {
      apiResponseHandler.sendError(
        400,
        false,
        `Could not be able to find the course ${courseId}`,
        function (response) {
          res.json(response);
        }
      );
    } else {
      apiResponseHandler.sendResponse(
        200,
        true,
        courseDetails,
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
export default courseCntrl;

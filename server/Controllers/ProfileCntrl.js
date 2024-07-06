import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import profileModel from "../Models/Profile.js";
import userModel from "../Models/Users.js";
import uploadImageToCloudinary from "../Utilities/imgUploader.js";
import { config } from "dotenv";
config();
const profileCntrl = Object();

profileCntrl.updateProfile = async (req, res) => {
  try {
    //fetch data
    const { gender = "", dateOfBirth = "", about, contactNumber } = req.body;
    //user id get
    const id = req.user.id;
    //vaildation
    if (!contactNumber || !id) {
      apiResponseHandler.sendError(
        400,
        false,
        "all field are required",
        function (response) {
          res.json(response);
        }
      );
    }

    //for now as no data present in profile model so,from user model we are taking userID form user
    const userDetails = await userModel.findById(id);
    //profile id form userDetails
    const profileId = userDetails.additionalDeatils;
    const profileDetails = await profileModel.findById(profileId);

    //save details
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    let updateProfileData = await profileDetails.save();

    if (updateProfileData) {
      apiResponseHandler.sendResponse(
        200,
        true,
        updateProfileData,
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      return apiResponseHandler.sendError(
        422,
        false,
        "Unable To update profile!",
        (response) => {
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

profileCntrl.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    // find profile data
    const userDetails = await userModel
      .find({ _id: id })
      .populate("additionalDeatils")
      .exec();

    if (userDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        userDetails,
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To fetch profile data!",
        (response) => {
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
      function (response) {
        res.json(response);
      }
    );
  }
};

profileCntrl.deleteAccount = async (req, res) => {
  try {
    //fetch id
    const id = req.user.id;
    //vaildation wheather id is correct
    const userDetails = await userModel.findById({ _id: id });
    if (!userDetails) {
      apiResponseHandler.sendError(
        404,
        false,
        "user not found!!",
        function (response) {
          res.json(response);
        }
      );
    }
    //delete profile
    await profileModel.findByIdAndDelete({
      _id: userDetails.additionalDeatils,
    });
    //delete user
    let deleteUser = await userModel.findByIdAndDelete({ _id: id });
    //response
    if (deleteUser) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "user deleted successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To delete user !",
        (response) => {
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

profileCntrl.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await userModel.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    if (updatedProfile) {
      return apiResponseHandler.sendResponse(
        200,
        true,
        updatedProfile,
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

profileCntrl.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await userModel
      .findOne({
        _id: userId,
      })
      .populate("courses")
      .exec();

    if (!userDetails) {
      apiResponseHandler.sendError(
        400,
        false,
        `Could not find user with id:${userDetails}`,
        function (response) {
          res.json(response);
        }
      );
    } else {
      apiResponseHandler.sendResponse(
        200,
        true,
        userDetails,
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
export default profileCntrl;

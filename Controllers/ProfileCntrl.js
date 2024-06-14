import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import profileModel from "../Models/Profile.js";
import userModel from "../Models/Users.js";
const profileCntrl = Object();

profileCntrl.updateProfile = async (req, res) => {
  try {
    //fetch data
    const { gender = "", dateOfBirth = "", about, contactNumber } = req.body;
    //user id get
    const id = req.user.id;
    //vaildation
    if (!gender || !contactNumber || !id) {
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
        "profile updated successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
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
      .find(id)
      .populate("additionalDeatils")
      .exec();

    if (userDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "profile data fetched successfully",
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
      (response) => {
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
    const userDetails = await userModel.findById(id);
    if (!userDetails) {
      apiResponseHandler.sendError(
        400,
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
export default profileCntrl;

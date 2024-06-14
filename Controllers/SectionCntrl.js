import sectionModel from "../Models/Section.js";
import courseModel from "../Models/Course.js";
import apiResponseHandler from "../Utilities/apiResponseHandler.js";
const sectionCntrl = Object();

sectionCntrl.createSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, courseId } = req.Object;

    //check vaildation
    if (!sectionName || !courseId) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Missing, All fields are required",
        function (response) {
          res.json(response);
        }
      );
    }

    // create entry in db->section
    const newSection = await sectionModel.create({ sectionName });

    //update the course sechma with section id
    const updateCourseDetails = await courseModel.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    );

    if (updateCourseDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        updateCourseDetails,
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To get upateded course detail!",
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

sectionCntrl.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    //check vaildation
    if (!sectionName || !courseId) {
      apiResponseHandler.sendResponse(
        400,
        false,
        "Missing, All fields are required",
        function (response) {
          res.json(response);
        }
      );
    }

    const updateSection = await sectionModel.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (updateSection) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "Section Update successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To upateded section!",
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

sectionCntrl.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const deleteSectionDetails = await sectionModel.findByIdAndDelete(
      sectionId
    );
    //TODO[duringTesting]:do we need to update the course section schema because it contain section id

    if (deleteSectionDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "section delete successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To delete section!",
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
export default sectionCntrl;

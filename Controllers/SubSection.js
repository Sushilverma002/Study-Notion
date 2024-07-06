import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import subSectionModel from "../Models/SubSection.js";
import sectionModel from "../Models/Section.js";
import uploadImageToCloudinary from "../Utilities/imgUploader.js";
import { config } from "dotenv";
config();
const subSectionCntrl = Object();

subSectionCntrl.createSubSection = async (req, res) => {
  try {
    //fetch dat from req body
    const { title, timeDuration, description, sectionId } = req.body;
    // exact video/file url
    const video = req.files.videoFile;
    //vaildation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      apiResponseHandler.sendError(
        400,
        false,
        "All fields are required.",
        function (response) {
          res.json(response);
        }
      );
    }
    // upload video to the cloudinary
    const uploadDeatils = uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // create a subsectoin
    const subSectionDetails = await subSectionModel.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDeatils.secure_url,
    });
    // update that subsection id in the section
    const updateSection = await sectionModel.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: subSectionDetails.id } },
      { new: true }
    );
    //to do ::add populatehere

    // response retrun.
    if (updateSection) {
      apiResponseHandler.sendResponse(
        200,
        true,
        updateSection,
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To create subSection!",
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

subSectionCntrl.updateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    // exact video/file url
    const video = req.files.VideoFile;
    //vaildation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      apiResponseHandler.sendError(
        400,
        false,
        "All fields are required.",
        function (response) {
          res.json(response);
        }
      );
    }

    const updateSection = await subSectionCntrl.findByIdAndUpdate(
      sectionId,
      { title },
      { timeDuration },
      { description },
      { video },
      { new: true }
    );

    if (updateSection) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "subSection Update successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To upateded Subsection!",
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

subSectionCntrl.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;
    let sectionDetails = await sectionModel.find({ _id: subSectionId });
    const deleteSectionDetails = await subSectionModel.findByIdAndDelete({
      _id: sectionDetails.subSection,
    });

    const deleteSubSection = await subSectionModel.findByIdAndDelete(
      subSectionId
    );
    //TODO[duringTesting]:do we need to update the course section schema because it contain section id

    if (deleteSubSection) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "SubSection delete successfully",
        function (response) {
          res.json(response);
        }
      );
    } else {
      // Sending 422 Status Code
      apiResponseHandler.sendError(
        422,
        false,
        "Unable To delete subSection!",
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
export default subSectionCntrl;

import apiResponseHandler from "../Utilities/apiResponseHandler.js";
import categoryModel from "../Models/Category.js";

const categoryCntrl = Object();

categoryCntrl.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      apiResponseHandler.sendError(
        400,
        false,
        "all fields are required.",
        function (response) {
          return res.json(response);
        }
      );
    }

    const tagDetails = await categoryModel.create({
      name: name,
      description: description,
    });
    console.log("category details", tagDetails);
    if (tagDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        "new category added",
        function (response) {
          return res.json(response);
        }
      );
    }
  } catch (error) {
    console.log("some error occured", error);
    return apiResponseHandler.sendResponse(
      500,
      false,
      "Something went wrong, internal sever error.",
      function (response) {
        res.json(response);
      }
    );
  }
};

categoryCntrl.getAllCategory = async (req, res) => {
  try {
    const getTagDetails = await categoryModel.find(
      {},
      { name: true, description: true }
    );
    if (getTagDetails) {
      apiResponseHandler.sendResponse(
        200,
        true,
        getTagDetails,
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
categoryCntrl.categoryPageDeatils = async (req, res) => {
  try {
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await categoryModel
      .findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      apiResponseHandler.sendError(
        400,
        false,
        "data not found!!",
        function (response) {
          res.json(response);
        }
      );
    }
    //get coursesfor different categories
    const differentCategories = await categoryModel
      .find({
        _id: { $ne: categoryId },
      })
      .populate("courses")
      .exec();

    //get top 10 selling courses
    //HW - write it on your own

    const result = {
      data: {
        selectedCategory,
        differentCategories,
      },
    };

    apiResponseHandler.sendResponse(200, true, result, function (response) {
      res.json(response);
    });
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

export default categoryCntrl;

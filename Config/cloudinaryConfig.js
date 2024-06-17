import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  } catch (error) {
    console.log("some error occured : ", error);
  }
};

export default cloudinaryConnect;

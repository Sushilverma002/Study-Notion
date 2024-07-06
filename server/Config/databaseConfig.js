import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URL = process.env.MONGO_DB_URL;
const MongoDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("db is connected..");
  } catch (error) {
    console.log("Database is Not Connected", error);
  }
};

export default MongoDB;

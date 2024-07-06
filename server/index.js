import express from "express";
import { config } from "dotenv";
import MongoDB from "./Config/databaseConfig.js";
import bodyParser from "body-parser";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";
import cloudinaryConnect from "./Config/cloudinaryConfig.js";
import fileupload from "express-fileupload";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT_NO || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
//clouding connect
cloudinaryConnect();

//mounting
app.use("/api/v1", router);

app.use(cookieParser({}));
const start = async (req, res) => {
  try {
    await MongoDB(process);
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}.`);
    });
  } catch (error) {
    console.log("error in lisiting.....", error);
  }
};
start();

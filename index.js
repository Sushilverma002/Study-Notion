import express from "express";
import { config } from "dotenv";
import MongoDB from "./Config/databaseConfig.js";
import bodyParser from "body-parser";
import router from "./Routes/index.js";
import cookieParser from "cookie-parser";
config();
const app = express();
const PORT = process.env.PORT_NO || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mounting
app.use("/api/v1", router);
app.use(cookieParser({}));
const start = async (req, res) => {
  try {
    await MongoDB(process);
    app.listen(PORT, () => {
      console.log(`Yes I am connected at ${PORT}.`);
    });
  } catch (error) {
    console.log("error in lisiting.", error);
  }
};
start();

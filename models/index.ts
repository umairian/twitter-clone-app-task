import mongoose from "mongoose";
import config from "../config";

// print mongoose logs in dev env
if (config.env === "development") {
  mongoose.set("debug", true);
}

export const connect = async () => {
  try {
    await mongoose.connect(`${config.mongo.uri}/${config.mongo.database}`);
    console.log("Database connection established successfully.");
  } catch (err) {
    console.log(err);
  }
};

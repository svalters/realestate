import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

let connection: Promise<typeof mongoose> | undefined = undefined;

const newConnection = () => {
  connection = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};

export default connection ?? newConnection();

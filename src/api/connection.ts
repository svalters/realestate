import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

const connection = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;

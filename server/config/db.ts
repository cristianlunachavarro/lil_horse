import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/lil_horse")
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.log(err));

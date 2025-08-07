import mongoose from "mongoose";
export default async function connectDB(uri){
  await mongoose.connect(uri, { dbName: "task_manager" });
  console.log("MongoDB connected");
}

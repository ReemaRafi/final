import mongoose from "mongoose";
const resetTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
  token: { type:String, required:true },
  expiresAt: { type:Date, required:true }
},{ timestamps:true });

export default mongoose.model("ResetToken", resetTokenSchema);

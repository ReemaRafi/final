import jwt from "jsonwebtoken";
export const signAuthToken = (user) => 
  jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:"7d" });

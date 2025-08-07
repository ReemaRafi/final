import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if(!token) return res.status(401).json({message:"Auth required"});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  }catch(e){
    return res.status(401).json({message:"Invalid/Expired token"});
  }
};

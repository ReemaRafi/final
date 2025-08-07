import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import ResetToken from "../models/ResetToken.js";
import { signAuthToken } from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

const router = Router();

// Register
router.post("/register", async (req,res)=>{
  const { name,email,password, role } = req.body;
  if(!name || !email || !password) return res.status(400).json({message:"Missing fields"});
  const exists = await User.findOne({email});
  if(exists) return res.status(400).json({message:"Email already used"});
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name,email,password:hash, role: role === "admin" ? "admin" : "user" });
  const token = signAuthToken(user);
  res.cookie("token", token, { httpOnly:true, sameSite:"lax" });
  res.json({ user:{ id:user._id, name:user.name, email:user.email, role:user.role } });
});

// Login
router.post("/login", async (req,res)=>{
  const { email,password } = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid credentials"});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({message:"Invalid credentials"});
  const token = signAuthToken(user);
  res.cookie("token", token, { httpOnly:true, sameSite:"lax" });
  res.json({ user:{ id:user._id, name:user.name, email:user.email, role:user.role } });
});

// Me
router.get("/me", async (req,res)=>{
  const token = req.cookies?.token;
  if(!token) return res.json({ user:null });
  try{
    const decoded = (await import("jsonwebtoken")).default.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  }catch{
    res.json({ user:null });
  }
});

// Logout
router.post("/logout", (req,res)=>{
  res.clearCookie("token");
  res.json({message:"Logged out"});
});

// Forgot: send reset link
router.post("/forgot", async (req,res)=>{
  const { email } = req.body;
  const user = await User.findOne({email});
  if(!user) return res.json({message:"If email exists, reset link sent."});
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000*60*15);
  await ResetToken.deleteMany({ user: user._id });
  await ResetToken.create({ user:user._id, token, expiresAt });
  const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
  await sendEmail(user.email, "Reset your password", `<p>Click to reset: <a href="${link}">${link}</a></p>`);
  res.json({message:"If email exists, reset link sent."});
});

// Reset
router.post("/reset", async (req,res)=>{
  const { id, token, password } = req.body;
  const doc = await ResetToken.findOne({ user:id, token });
  if(!doc || doc.expiresAt < new Date()) return res.status(400).json({message:"Invalid/expired token"});
  const hash = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(id, { password:hash });
  await ResetToken.deleteMany({ user:id });
  res.json({message:"Password updated"});
});

export default router;

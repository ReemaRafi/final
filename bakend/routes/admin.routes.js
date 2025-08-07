import { Router } from "express";
import Task from "../models/Task.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = Router();
router.use(requireAuth, requireRole(["admin"]));

router.get("/tasks", async (req,res)=>{
  const tasks = await Task.find({}).populate("user","name email role").sort("-createdAt");
  res.json(tasks);
});

export default router;

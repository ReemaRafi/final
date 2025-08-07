import { Router } from "express";
import Task from "../models/Task.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// Create
router.post("/", async (req,res)=>{
  const { title, description } = req.body;
  const task = await Task.create({ user:req.user.id, title, description });
  res.json(task);
});

// List (self)
router.get("/", async (req,res)=>{
  const list = await Task.find({ user:req.user.id }).sort("-createdAt");
  res.json(list);
});

// Update status/title/desc
router.put("/:id", async (req,res)=>{
  const { status, title, description } = req.body;
  const t = await Task.findOne({ _id:req.params.id, user:req.user.id });
  if(!t) return res.status(404).json({message:"Not found"});
  if(status) t.status = status;
  if(title!==undefined) t.title = title;
  if(description!==undefined) t.description = description;
  await t.save();
  res.json(t);
});

// Delete
router.delete("/:id", async (req,res)=>{
  await Task.deleteOne({ _id:req.params.id, user:req.user.id });
  res.json({ ok:true });
});

export default router;

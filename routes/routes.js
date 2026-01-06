import express from "express";
import { createUser, getAllusers, updateUser, deleteUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/", getAllusers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
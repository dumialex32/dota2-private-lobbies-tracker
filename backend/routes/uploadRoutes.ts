import express from "express";
import { uploadReplay } from "../controllers/uploadController";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = express.Router();

router.route("/").post(uploadMiddleware, uploadReplay);

export default router;

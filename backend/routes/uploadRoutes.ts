import express from "express";
import { uploadFile, uploadMiddleware } from "../controllers/uploadController";

const router = express.Router();

// Use the upload middleware before the uploadFile handler
router.route("/").post(uploadMiddleware, uploadFile);

export default router;

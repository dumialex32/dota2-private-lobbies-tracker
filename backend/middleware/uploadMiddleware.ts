import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const format = file.originalname.split(".").pop()?.toLowerCase();
  if (format !== "dem") {
    return cb(new Error("Only .dem files are allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export const uploadMiddleware = upload.single("replay");

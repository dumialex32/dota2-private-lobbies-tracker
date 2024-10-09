import { Request, Response } from "express";
import multer from "multer";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/parser/clarity-examples");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFile = (req: Request, res: Response): void => {
  const replay = req.file;

  if (!replay) {
    res.status(400).send("No file uploaded");
    return;
  }

  console.log("File uploaded successfully:", replay);

  const filePath = path.resolve(replay.path);

  const gradleWrapperPath = path.resolve(
    __dirname,
    "..",
    "parser",
    "clarity-examples",
    "gradlew.bat"
  );

  console.log("Gradle wrapper path:", gradleWrapperPath);
  console.log("File path:", filePath);

  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    res.status(404).send("Uploaded file not found");
    return;
  }

  const tempDir = path.join(os.tmpdir(), "dota-pp");
  fs.mkdirSync(tempDir, { recursive: true });
  const tempFilePath = path.join(tempDir, path.basename(filePath));

  fs.copyFileSync(filePath, tempFilePath);

  const command = `"${gradleWrapperPath}" infoRun --args "${tempFilePath}"`;

  exec(
    command,
    { cwd: path.resolve(__dirname, "..", "parser", "clarity-examples") },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error parsing .dem file: ${error.message}`);
        return res.status(500).send("Error processing file");
      }

      console.log(stdout);
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error(`Error deleting temporary file: ${err.message}`);
        } else {
          console.log(`Successfully deleted temporary file: ${tempFilePath}`);
        }
      });

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting uploaded file: ${err.message}`);
        } else {
          console.log(`Successfully deleted uploaded file: ${filePath}`);
        }
      });

      console.log("File processed successfully");
      res.json();
    }
  );
};

export const uploadMiddleware = upload.single("file");

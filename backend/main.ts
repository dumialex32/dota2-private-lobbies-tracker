import dotenv from "dotenv";
import connectDB from "./database/db";
import express, { urlencoded } from "express";
import uploadRoutes from "../backend/routes/uploadRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();

const app = express();

const port: number = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);
app.use(errorMiddleware);

const init = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

init();

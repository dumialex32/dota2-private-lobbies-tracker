import mongoose from "mongoose";

const connectDB = async () => {
  const attemptDelay: number = 3000;
  const maxAttepts: number = 5;
  for (let attempt = 1; attempt <= maxAttepts; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI as string);
      console.log(`MongoDB connected to ${conn.connection.host}`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Error connecting to MongoDB (attempt ${attempt}/${maxAttepts}): ${error.message}`
        );
      } else {
        console.error(
          `Error connect to MongoDB attempt: ${attempt}/${maxAttepts}`
        );
      }
    }
    if (attempt === maxAttepts) {
      process.exit(1);
    }

    await new Promise((resolve) => setTimeout(resolve, attemptDelay));
  }
};

export default connectDB;

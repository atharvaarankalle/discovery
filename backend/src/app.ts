import express from "express";
import routes from "../src/routes/routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());

const DB_URL =
  process.env.MONGODB_CONNECTION_STRING ??
  "mongodb://localhost:27017/mydatabase"; // this is not implemented

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", routes);

const PORT = process.env.BACKEND_PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

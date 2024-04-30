import express from "express";
import routes from "../src/routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT ?? 3000;

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

import express from "express";
import routes from "../src/routes/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT ?? 3000;

app.use("/", routes);

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

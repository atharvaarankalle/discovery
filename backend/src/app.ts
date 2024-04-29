import express from "express";
import routes from "../src/routes/routes";

const app = express();
const PORT = 3000; // TODO: .env file

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

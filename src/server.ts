import express from "express";
import router from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;
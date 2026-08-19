import express from "express";
import router from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(cors({
  origin: ["http://localhost:3000", "https://seu-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"]
}));

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;
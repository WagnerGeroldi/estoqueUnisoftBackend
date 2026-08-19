import express from "express";
import router from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://estoque-unisoft-frontend.vercel.app",
    "http://192.168.3.46:3000/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"]
}));

app.options("*", cors());

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;
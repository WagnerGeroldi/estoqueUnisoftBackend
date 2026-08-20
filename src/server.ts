import express from "express";
import router from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();

const allowedOrigins = [
  "https://estoque-unisoft-front.vercel.app/",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-access-token"],
}));

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;
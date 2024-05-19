import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

if (!MONGODB_URL) {
  console.error("A variavel de ambiente MONGODB_URL não está definida!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Conexão com o MongoDB estabilizada!");
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB: ", error);
  });

app.use(router);

app.listen(PORT, () => {
  console.log("------- Server online -------");
});

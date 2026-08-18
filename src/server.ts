import  express from "express";
import router from "./routes";
import { db } from "./database";
import cors from "cors";
import 'dotenv/config'
import bodyParser from "body-parser";


const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(router)

const PORT =  process.env.PORT || 3333

app.listen(PORT, async () => {
    try {
        await db.sync({ alter: true }); // ajusta a estrutura sem apagar dados
        console.log(`Server rodando na porta ${PORT}`);
    } catch (error) {
        console.error("Erro ao sincronizar com o banco:", error);
    }
});


export default app


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
    await db.sync();
    console.log(`Server rodando na porta ${PORT}`)
})

export default app


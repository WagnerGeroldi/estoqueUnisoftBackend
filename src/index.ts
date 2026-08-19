import app from "./server";
import { db } from "./database";

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
    try {
        await db.sync({ alter: true });
        console.log(`Server rodando na porta ${PORT}`);
    } catch (error) {
        console.error("Erro ao sincronizar com o banco:", error);
    }
});
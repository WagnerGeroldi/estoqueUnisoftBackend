"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = require("./database");
const PORT = process.env.PORT || 3333;
server_1.default.listen(PORT, async () => {
    try {
        await database_1.db.sync({ alter: true });
        console.log(`Server rodando na porta ${PORT}`);
    }
    catch (error) {
        console.error("Erro ao sincronizar com o banco:", error);
    }
});

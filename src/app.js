import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

//Estrutura em Minimum Viable Product 

// Criação do servidor
const app = express()

// Configurações
app.use(express.json())
app.use(cors())
dotenv.config()

//Conexão com o banco de dados
const { Pool } = pg;
const configDatabase = {
    connectionString: process.env.DATABASE_URL,
};
const db = new Pool(configDatabase);

//Endpoints

// Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
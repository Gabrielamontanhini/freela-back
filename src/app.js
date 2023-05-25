import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

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
app.get("/teste", async (req, res) => {
    try {
        const teste = await db.query(`SELECT * FROM usuarios;`)
        res.send(teste.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/cadastro", async (req, res) => {
    const { nome, email, foto, biografia, senha } = req.body
    try {

        const hash = bcrypt.hashSync(senha, 10)
        await db.query(`INSERT INTO usuarios
    (nome, email, foto, biografia, senha)
    VALUES
    ($1, $2, $3, $4, $5);`, [nome, email, foto, biografia, hash])
        return res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

app.post("/entrar", async (req, res) => {
    const { email, senha } = req.body
    try {
        
        const usuario = await db.query(`SELECT * FROM usuarios WHERE email = $1;`, [ email])
        if (usuario.rowCount==0) return res.sendStatus(404)
        const hash = bcrypt.hashSync(senha, 10)
        const senhaCorreta = bcrypt.compare(hash, usuario.rows[0].senha)
        if (!senhaCorreta) return res.status(401).send({ message: "Senha incorreta!" })
        const token = uuid()

        return res.status(201).send({token})
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})



app.get("/post", async (req, res) => {
    try {
        const teste = await db.query(`SELECT posts.* , usuarios.nome, usuarios.foto FROM posts
        JOIN usuarios ON posts.postador = usuarios.id;`)
        res.send(teste.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
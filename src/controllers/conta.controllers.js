import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { deletarUsuarioDeSessao, entrarContaDB, getNickNameDB, postarCadastroDB, procurarNicknameDB } from "../repositories/conta.repository.js";


export async function postCadastro(req, res){ //DANDO CERTO
    const { nome, nickname, foto, biografia, senha, confirma } = req.body
    const hash = bcrypt.hashSync(senha, 10)
    try {
        await postarCadastroDB(req.body, hash)
        return res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getNickName(req, res){
    try{
     const sessao = req.body
        const nickname = await getNickNameDB(sessao)
        res.status(201).send(nickname.rows[0].nickname)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postEntrar(req, res){ //DANDO CERTO
    const { nickname, senha } = req.body
    const usuario = await procurarNicknameDB(nickname)
    if (usuario.rowCount == 0) return res.send({ message: "Não encontramos esse usuario!" })
    try {
        const hash = bcrypt.hashSync(senha, 10)
        const senhaCorreta = bcrypt.compare(hash, usuario.rows[0].senha)
        if (!senhaCorreta) return res.status(401).send({ message: "Senha incorreta!" })
        const token = uuid()
        await entrarContaDB(usuario.rows[0].id, token)
        return res.status(201).send(token)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


export async function sairDaConta(req, res){ //DANDO CERTO
    try {
        const sessao = res.locals.sessao
       await deletarUsuarioDeSessao(sessao)
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

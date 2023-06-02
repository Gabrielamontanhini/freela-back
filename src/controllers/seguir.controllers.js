import { db } from "../database/database.connection.js"
import { deixarSeguirUsuarioDB, pegarQuemSegueDB, pegarQuemSegueONicknameDB, pegarSeguidoresDoNicknameDB, pegarSeguidoresPorIdDB, seguirUsuarioDB } from "../repositories/seguir.repository.js"

export async function getMeusSeguidores(req, res){ //DANDO CERTO
    try {
        const sessao = res.locals.sessao
        const seguidores = await pegarSeguidoresPorIdDB(sessao)
        res.status(200).send(seguidores.rows)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getSeguidorNick(req, res){
    const {nickname} = req.params
    try{
        const seguidoresDoNick = await pegarSeguidoresDoNicknameDB(nickname)
        res.status(200).send(seguidoresDoNick.rows)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getNickSegue(req, res){
    const {nickname} = req.params
    try{
        const seguindoONick= await pegarQuemSegueONicknameDB(nickname)
        res.status(200).send(seguindoONick.rows)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getQuemSigo(req, res){ //DANDO CERTO
    try {
        const sessao = res.locals.sessao
        const seguidores = await pegarQuemSegueDB(sessao)
        res.status(200).send(seguidores.rows)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postSeguirUsuario(req, res){ //DANDO CERTO
    const { id } = req.params;
    try {
        const sessao = res.locals.sessao
        await seguirUsuarioDB(id, sessao)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteSeguirUsuario(req, res){ //DANDO CERTO
    const { id} = req.params;
    try {
        const sessao = res.locals.sessao
        await deixarSeguirUsuarioDB(id, sessao)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

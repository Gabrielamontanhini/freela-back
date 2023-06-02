import { db } from "../database/database.connection.js"
import { deletarCurtidaDB, pegarCurtidasPostDB, pegarTodosPostsDB, postarCurtidaPostDB, postarPostDB } from "../repositories/posts.repository.js"
db


export async function postPostarPost(req, res) { //DANDO CERTO
    const { foto_post, descrição } = req.body
    try {
        const sessao = res.locals.sessao
        const postado = await postarPostDB(sessao.rows[0].usuario_id, foto_post, descrição)
        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deletarCurtida(req, res){
    const {id} = req.params
    try{
        const sessao = res.locals.sessao
        await deletarCurtidaDB(id, sessao)
        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getFeed(req, res) { //DANDO CERTO
    try {
        const feed = await pegarTodosPostsDB()
        res.send(feed.rows).status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postCurtirPost(req, res) { //DANDO CERTO
    const { id, postador } = req.body;
    try {
        const sessao = res.locals.sessao
        await postarCurtidaPostDB(id, sessao, postador)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCurtidasPorPost(req, res) { //DANDO CERTO
    const { id } = req.params
    try {
        const post = await pegarCurtidasPostDB(id)
        res.status(200).send(post.rows)
    } catch (err) {
        res.status(500).send("Nao ta indo n")
    }
}
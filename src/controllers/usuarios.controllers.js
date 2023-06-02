import { db } from "../database/database.connection.js"
import { pegarTodosPostsDB } from "../repositories/posts.repository.js"
import {  pegarDetalhesPorIdDB, pegarPerfilPorNickDB, pegarPostsPorIdDB, pegarPostsPorNickDB, pegarTodosUsuariosDB, pegarUsuarioPorIdDB } from "../repositories/usuarios.repository.js"


export async function getPerfil(req, res){ //DANDO CERTO
    const { id } = req.params
    try {
        const posts =await pegarPostsPorIdDB(id)
        const perfil = await pegarDetalhesPorIdDB(id)
        const pagina = [perfil.rows[0], posts.rows]
        return res.status(200).send(pagina)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getPerfilNick(req, res){
    const {nickname} = req.params
    try { 
        const pegarNick = await pegarPerfilPorNickDB(nickname)
        const postsNick = await pegarPostsPorNickDB(nickname)
        const perfilNick = [pegarNick.rows[0], postsNick.rows]
        return res.status(200).send(perfilNick)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getMeuPerfil(req, res){ //DANDO CERTO
    try {
        const sessao = res.locals.sessao
        const id = sessao.rows[0].usuario_id
    const posts = await pegarTodosPostsDB(id)
    const perfil = await pegarDetalhesPorIdDB(id)
        const pagina = [perfil.rows[0], posts.rows]
        return res.status(200).send(pagina)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getUsuarios(req, res){ //DANDO CERTO
    try {
        const usuarios = await pegarTodosUsuariosDB()
        res.send(usuarios.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function getUsuarioEspecifico(req, res){ //DANDO CERTO
    const { id } = req.params
    try {
        const teste = await pegarUsuarioPorIdDB(id)
        res.send(teste.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

import { db } from "../database/database.connection.js";

export async function pegarTodosUsuariosDB(){ //DANDO CERTO
    const resultado = await db.query(`SELECT * FROM usuarios;`) 
    return resultado 
}

export async function pegarUsuarioPorIdDB(id){ //DANDO CERTO
    const resultado = await db.query(`SELECT * FROM usuarios WHERE id=$1;`, [id])
    return resultado 
}

export async function pegarPerfilPorNickDB(nick){
    const resultado = await db.query(`SELECT usuarios.nome, usuarios.nickname, usuarios.id, usuarios.foto, usuarios.biografia FROM usuarios WHERE nickname=$1`, [nick])
    return resultado 
}

export async function pegarPostsPorNickDB(nick){
    const resultado = await db.query(`SELECT usuarios.nickname,usuarios.nome, usuarios.foto AS avatar, posts.postador AS id_usuario, posts.criação, posts.id AS id_post,  posts.descrição, posts.foto_post FROM usuarios
    JOIN posts ON usuarios.id = posts.postador WHERE usuarios.nickname = $1;`, [nick])
    return resultado 
}
export async function pegarPostsPorIdDB(id){ //DANDO CERTO
    const resultado = await db.query(`SELECT * FROM posts WHERE postador =$1 ORDER BY id DESC ;`, [id])
    return resultado 
}

export async function pegarDetalhesPorIdDB(id){ //DANDO CERTO
    const resultado = await db.query(`SELECT usuarios.nome, usuarios.foto, usuarios.biografia FROM usuarios WHERE id = $1;`, [id])
    return resultado
}
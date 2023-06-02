import { db } from "../database/database.connection.js";

export async function pegarTodosPostsDB(){
    const resultado = await db.query(`SELECT *, posts.id AS id_post FROM posts
    JOIN usuarios ON posts.postador = usuarios.id
    ORDER BY posts.id DESC`)
    return resultado
}

export async function deletarCurtidaDB(id, sessao){
    const resultado = await db.query(`DELETE FROM posts_curtidos WHERE id_post = $1 AND id_curtidor=$2;`, [id, sessao.rows[0].usuario_id])
    return resultado 
}

export async function postarPostDB(id, foto_post,descrição){ //DANDO CERTO
    const resultado =   await db.query(`INSERT INTO posts (postador, foto_post, descrição) VALUES ($1, $2, $3);`, [id, foto_post, descrição])
    return resultado
}

export async function pegarCurtidasPostDB(id){ //DANDO CERTO
    const resultado =  await db.query(`SELECT posts_curtidos.*, usuarios.nickname FROM posts_curtidos JOIN usuarios ON posts_curtidos.id_curtidor = usuarios.id WHERE id_post = $1;`, [id])
return resultado
}

export async function postarCurtidaPostDB(id, sessao, postador){ //DANDO CERTO
    const resultado = await db.query(`INSERT INTO posts_curtidos (id_post, id_curtidor, id_dono) VALUES ($1, $2, $3);`, [id, sessao.rows[0].usuario_id, postador]) 
    return resultado 
}
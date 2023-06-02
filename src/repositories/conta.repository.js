import { db } from "../database/database.connection.js"

export async function postarCadastroDB(body, hash){ //DANDO CERTO
    const { nome, nickname, foto, biografia } = body
    const resultado =  await db.query(`INSERT INTO usuarios
    (nome, nickname, foto, biografia, senha)
    VALUES ($1, $2, $3, $4, $5);`,
    [nome, nickname, foto, biografia, hash])
    return resultado 
}
export async function getNickNameDB(sessao){
    const resultado = await db.query(`SELECT usuarios.nickname FROM usuarios JOIN sessoes ON usuarios.id = sessoes.usuario_id WHERE sessoes.token = $1;`, [sessao.rows[0].usuario_id])
    return resultado 
}

export async function procurarNicknameDB(nickname){ //DANDO CERTO
    const resultado  = await db.query(`SELECT * FROM usuarios WHERE nickname = $1;`, [nickname])
    return resultado 
}

export async function entrarContaDB(usuario, token){ //DANDO CERTO
    const resultado = await db.query(`INSERT INTO sessoes (usuario_id, token) VALUES ($1, $2);`, [usuario, token])
    return resultado
}
export async function deletarUsuarioDeSessao(sessao){ //DANDO CERTO
    const resultado = await db.query(`DELETE FROM sessoes WHERE usuario_id = $1;`, [sessao.rows[0].usuario_id])
return resultado 
}

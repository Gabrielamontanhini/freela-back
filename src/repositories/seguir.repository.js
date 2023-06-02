import { db } from "../database/database.connection.js";

export async function pegarSeguidoresPorIdDB(sessao){ //DANDO CERTO
    const resultado =  await db.query(`SELECT * FROM seguidores
    JOIN usuarios ON id_seguidor=usuarios.id
    WHERE id_seguido = $1;`, [sessao.rows[0].usuario_id])
    return resultado 
}

export async function pegarQuemSegueDB(sessao){ //DANDO CERTO 
    const resultado = await db.query(`SELECT * FROM seguidores
    JOIN usuarios ON id_seguido=usuarios.id
    WHERE id_seguidor = $1;`, [sessao.rows[0].usuario_id]) 
    return resultado 
}

export async function seguirUsuarioDB(id, sessao){ //DANDO CERTO
    const resultado = await db.query(`INSERT INTO seguidores (id_seguido, id_seguidor) VALUES ($1, $2);`, [id, sessao.rows[0].usuario_id])
    return resultado 
}

export async function deixarSeguirUsuarioDB(id, sessao){
const resultado = await db.query(`DELETE FROM seguidores WHERE id_seguido=$1 AND id_seguidor=$2;`,[id, sessao.rows[0].usuario_id] )
return resultado 
}

export async function pegarSeguidoresDoNicknameDB(nickname){
    const resultado = await db.query(`
	SELECT seguidores.*,
	u2.nome, u2.id, usuarios.nickname,u2.nickname,
	u2.foto, u2.biografia FROM seguidores 
	JOIN usuarios ON id_seguido=usuarios.id 
	JOIN usuarios u2 ON id_seguidor=u2.id
	WHERE usuarios.nickname=$1;`, [nickname])
    return resultado
}

export async function pegarQuemSegueONicknameDB(nickname){
    const resultado = await db.query(`
	SELECT seguidores.*,
	u2.nome, u2.id, usuarios.nickname,u2.nickname,
	u2.foto, u2.biografia FROM seguidores 
	JOIN usuarios ON id_seguidor=usuarios.id 
	JOIN usuarios u2 ON id_seguido=u2.id
	WHERE usuarios.nickname=$1;`, [nickname])
    return resultado
}
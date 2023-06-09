import { db } from "../database/database.connection.js"

export async function validateAuth(req, res, next){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).send(`${authorization}`)
    try{
        const sessao = await db.query(`SELECT usuario_id FROM sessoes WHERE token = $1;`, [token])
        if (sessao.rowCount === 0) return res.sendStatus(401)
        res.locals.sessao = sessao
        
next()
    }catch (err) {
        res.status(500).send(err.message)
    }
}
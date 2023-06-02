import { Router } from "express"
import { getMeuPerfil, getPerfil, getPerfilNick, getUsuarioEspecifico, getUsuarios } from "../controllers/usuarios.controllers.js"
import { validateAuth } from "../middlewares/auth.middleware.js"


const usuariosRouter = Router()

usuariosRouter.get("/usuarios", getUsuarios)

usuariosRouter.get("/usuarios/:nickname", getPerfilNick)


usuariosRouter.get("/usuarios/:id", getUsuarioEspecifico)


usuariosRouter.get("/perfil/:id", getPerfil)

usuariosRouter.get("/me/posts",validateAuth , getMeuPerfil)

export default usuariosRouter
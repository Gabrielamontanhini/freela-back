import { Router } from "express"
import { deleteSeguirUsuario, getMeusSeguidores, getNickSegue, getQuemSigo, getSeguidorNick, postSeguirUsuario } from "../controllers/seguir.controllers.js"
import { validateAuth } from "../middlewares/auth.middleware.js"


const seguirRouter = Router()

seguirRouter.get("/:nickname/seguidores", getSeguidorNick)
seguirRouter.get("/:nickname/seguindo", getNickSegue)

seguirRouter.use(validateAuth)
seguirRouter.post("/seguir/:id", postSeguirUsuario)
seguirRouter.delete("/seguir/:id", deleteSeguirUsuario)
seguirRouter.get("/seguidores", getMeusSeguidores)
seguirRouter.get("/seguindo", getQuemSigo)

export default seguirRouter
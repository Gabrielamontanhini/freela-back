import { Router } from "express"
import { getNickName, postCadastro, postEntrar, sairDaConta } from "../controllers/conta.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { cadastroSchema, entrarSchema } from "../schemas/conta.schemas.js"
import { validateAuth } from "../middlewares/auth.middleware.js"


const contaRouter = Router()

contaRouter.post("/cadastro",validateSchema(cadastroSchema), postCadastro)

contaRouter.get("/nickname", getNickName)

contaRouter.post("/entrar",validateSchema(entrarSchema), postEntrar)

contaRouter.delete("/sair/sessoes",validateAuth, sairDaConta)

export default contaRouter
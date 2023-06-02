import { Router } from "express";
import contaRouter from "./conta.routes.js";
import seguirRouter from "./seguir.routes.js";
import postsRouter from "./posts.routes.js";
import usuariosRouter from "./usuarios.routes.js";

const router = Router()

router.use(contaRouter)
router.use(postsRouter)
router.use(usuariosRouter)
router.use(seguirRouter)

export default router
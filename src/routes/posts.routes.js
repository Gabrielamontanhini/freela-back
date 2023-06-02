import { Router } from "express"
import { deletarCurtida, getCurtidasPorPost, getFeed, postCurtirPost, postPostarPost } from "../controllers/posts.controllers.js"
import { postSchema } from "../schemas/posts.schemas.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { validateAuth } from "../middlewares/auth.middleware.js"



const postsRouter = Router()

postsRouter.post("/curtir",validateAuth, postCurtirPost)

postsRouter.post("/post",validateAuth, validateSchema(postSchema), postPostarPost)

postsRouter.delete("/descurtir/:id", validateAuth, deletarCurtida)

postsRouter.get("/feed", getFeed)

postsRouter.get("/curtir/:id", getCurtidasPorPost)

export default postsRouter
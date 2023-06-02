
import joi from "joi"

export const postSchema = joi.object({
    foto_post: joi.string().required(),   
    descrição: joi.required(),
    hora: joi.required()})


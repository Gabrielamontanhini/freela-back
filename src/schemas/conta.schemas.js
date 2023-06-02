import joi from "joi"

export const cadastroSchema = joi.object({
    nome: joi.string().required(),
    nickname: joi.string().required(),
    foto: joi.string().uri().required(),
    biografia: joi.required(),
    senha: joi.required(),
    confirma: joi.required().valid(joi.ref("senha"))
})

export const entrarSchema = joi.object({
    nickname: joi.string().required(),
    senha: joi.required()})

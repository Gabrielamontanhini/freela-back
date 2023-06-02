export function validateSchema(schema){
    return (req, res, next) => {
        const validação = schema.validate(req.body, { abortEarly: false })
        if (validação.error) {
            const errors = validação.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        }
        next()
    }
}
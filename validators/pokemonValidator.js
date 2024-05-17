const Joi = require("joi");
//Validador do formulario de criacao e edicao
const PaginaSchema = Joi.object({
    numero: Joi.number()
        .integer()
        .greater(0)
        .required(),
    nome: Joi.string()
        .min(3)
        .max(30)
        .required(),
    geracao: Joi.string()
        .required(),
    tipo: Joi.string()
        .required(),
    cidade: Joi.string()
        .min(3)
        .max(30)
        .required(),
    originalImagem: Joi.string(),
    imagem : Joi.string(),
    descricao: Joi.string()
        .required()
});

module.exports = PaginaSchema;

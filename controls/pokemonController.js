
var express = require('express');
var PaginaSchema = require("../validators/pokemonValidator")
const Joi = require("joi")
var router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  //Seta elementos do template para a página criar
    criarPage = {
      botaoTexto: "Adicionar",
      acao: "criar/new",
    };
    
  res.render("pokemonFormulario", criarPage);
});

router.post("/", (req, res) => {
  const { error, value } = PaginaSchema.validate(req.body);
  if (error) {
    //Seta elementos do template para a página criar ,preenche campos e mostra o erro ao usuario
    const criarPage = {
      botaoTexto: "Adicionar",
      acao: "criar/new",
      dados: req.body,
      erro: error
    };
    res.render("pokemonFormulario", criarPage);
    return;
  }

  //Volta ao inicio se sucesso
  res.redirect("/");
});

module.exports = router
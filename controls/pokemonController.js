
var express = require('express');
var PaginaSchema = require("../validators/pokemonValidator")
const Joi = require("joi")
const Pokemon = require("../models/Pokemon")



var router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get("/new", (req, res) => {
  //Seta elementos do template para a página criar
    criarPage = {
      botaoTexto: "Adicionar",
      acao: "pokemon/new",
      css: "../css/pokemonFormulario.css",
    };
    
  res.render("pokemonFormulario", criarPage);
});

router.post("/new", (req, res) => {
  const { error, value } = PaginaSchema.validate(req.body);
  if (error) {
    //Seta elementos do template para a página criar, preenche campos e mostra o erro ao usuario
    const criarPage = {
      botaoTexto: "Adicionar",
      acao: "pokemon/new",
      dados: req.body,
      css: "../css/pokemonFormulario.css",
      erro: error
    };
    res.render("pokemonFormulario", criarPage);
    return;
  }
  const result = Pokemon.process(req.body)
  if(result == true){
    res.redirect("/");
    return
  }else{
    const criarPage = {
      botaoTexto: "Adicionar",
      acao: "pokemon/new",
      dados: req.body,
      css: "../css/pokemonFormulario.css",
      erro: result
    };
    res.render("pokemonFormulario", criarPage);
    return;
  }
  
});
//para acessar /pokemon/update/?nome=
router.get("/update", (req, res) => {
    const dados = Pokemon.getPokemonByName(req.query.nome)
    if(dados == null){
      res.redirect("/new")
      return
    }
    editarPage = {
      botaoTexto: "Editar",
      dados: dados,
      acao: "pokemon/update/?nome=" + req.query.nome,
      css: "../../css/pokemonFormulario.css",
      isEditar: true,
    };
    
  res.render("pokemonFormulario", editarPage);
});

router.post("/update", (req, res) => {
  const { error, value } = PaginaSchema.validate(req.body);
  if (error) {
    const editarPage = {
      botaoTexto: "Editar",
      dados: req.body,
      acao: "pokemon/update/?nome=" + req.query.nome,
      css: "../../css/pokemonFormulario.css",
      isEditar: true,
      erro: error
    };
    res.render("pokemonFormulario", editarPage);
    return;
  }
  const result = Pokemon.process(req.body)
  if(result == true){
    res.redirect("/");
    return
  }else{
    const editarPage = {
      botaoTexto: "Editar",
      acao: "update",
      dados: req.body,
      css: "../../css/pokemonFormulario.css",
      isEditar: true,
      erro: result
    };
    res.render("pokemonFormulario", editarPage);
    return;
  }
  
});

module.exports = router
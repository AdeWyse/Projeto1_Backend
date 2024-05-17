
var express = require('express');
var PaginaSchema = require("../validators/pokemonValidator")
const Joi = require("joi")
const Pokemon = require("../models/Pokemon")
const imgHandler = require("../helpers/imageUploadHandler")



var router = express.Router();

router.use(express.urlencoded({ extended: true }));

//Para acessar pokemon/new
router.get("/new", (req, res) => {
  //Seta elementos do template para a página criar
    criarPage = {
      botaoTexto: "Adicionar",
      acao: "pokemon/new",
      css: "../css/pokemonFormulario.css",
    };
    
  res.render("pokemonFormulario", criarPage);
});

router.post("/new", imgHandler.upload.single("imagem"), (req, res) => {
  var error = null;
  //Checa se imagem foi enviada
  if (!req.file) {
    req.body.imagem = null;
  }else{
    req.body.imagem = req.file.originalname;
    var { error, value } = PaginaSchema.validate(req.body);
  }
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
    //Seta elementos do template para a página criar, preenche campos e mostra o erro ao usuario
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
    //Carrega dados do pokemoon para preencher campos do formulario
    const dados = Pokemon.getPokemonByName(req.query.nome)
    //Se nao existir redireciona para a pagina de criar
    if(dados == null){
      res.redirect("/pokemon/new")
      return
    }
    //Seta elementos do template para a página criar, preenche campos e mostra o erro ao usuario
    editarPage = {
      botaoTexto: "Editar",
      dados: dados,
      acao: "pokemon/update/?nome=" + req.query.nome,
      css: "../../css/pokemonFormulario.css",
      isEditar: true,
    };
    
  res.render("pokemonFormulario", editarPage);
});

router.post("/update",imgHandler.upload.single("imagem"), (req, res) => {
  var error = null;
  //Chega se imagem foi alterada
  if (!req.file) {
    req.body.imagem = null;
  }else{
    req.body.imagem = req.file.originalname;
    var { error, value } = PaginaSchema.validate(req.body);
  }
  if (error) {
    //Seta elementos do template para a página editar, preenche campos e mostra o erro ao usuario
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
    res.redirect("/pokemon/?nome="+req.query.nome);
    return
  }else{
    //Seta elementos do template para a página editar, preenche campos e mostra o erro ao usuario
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
//==================================Jaco pagina individual=======================================
//para acessar /pokemon/{nome do pokemon}
router.get("/", (req, res) => {
  const nome = req.query.nome;
  var erro = "";
  var pokemon = Pokemon.getPokemonByName(nome);
  
  if(pokemon == null){
    erro= "Não foi possível encontrar este Pokémon!"
  }
  const criarPage = {
    pokemon: pokemon,
    css: "../css/pokemon.css",
    erro: erro
  };
    
  res.render("pokemon", criarPage);
});

//===============================jaco deletar=====================================================
//para acessar /pokemon/delete/?nome=
router.get("/delete", (req, res) => {
  //Carrega dados do pokemoon para preencher campos do formulario
  const dados = Pokemon.getPokemonByName(req.query.nome)
  //Se nao existir redireciona para a pagina de criar
  if(dados == null){
    res.redirect("/")
    return
  }
  //Seta elementos do template para a página criar, preenche campos e mostra o erro ao usuario
  apagarPage = {
    botaoTexto: "Apagar",
    dados: dados,
    acao: "pokemon/delete/?nome=" + req.query.nome,
    css: "../../css/pokemonFormulario.css",
    isEditar: false,
  };
  
res.render("pokemonFormulario", apagarPage);
});


router.post("/delete", (req, res) => {
  const { error, value } = PaginaSchema.validate(req.body);
  if (error) {
    //Seta elementos do template para a página editar, preenche campos e mostra o erro ao usuario
    const apagarPage = {
      botaoTexto: "Apagar",
      dados: req.body,
      acao: "pokemon/delete/?nome=" + req.query.nome,
      css: "../../css/pokemonFormulario.css",
      isEditar: false,
      erro: error
    };
    res.render("pokemonFormulario", apagarPage);
    return;
  }
  const result = Pokemon.delete(req.body.nome)
  if(result == true){
    res.redirect("/");
    return
  }else{
    //Seta elementos do template para a página editar, preenche campos e mostra o erro ao usuario
    const apagarPage = {
      botaoTexto: "Apagar",
      acao: "pokemon/delete/?nome=" + req.query.nome,
      dados: req.body,
      css: "../../css/pokemonFormulario.css",
      isEditar: false,
      erro: result
    };
    res.render("pokemonFormulario", apagarPage);
    return;
  }
  
});



module.exports = router
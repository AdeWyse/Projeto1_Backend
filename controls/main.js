const express = require('express')
const router = express.Router()
const Pokemon = require("../models/Pokemon")

router.get("/", (req, res) => {
    let error = ""
      //Seta elementos do template para a página criar
      var pokemons = Pokemon.list();

      renderPage = {
        pokemonList: pokemons,
        css: "../css/home.css",
      };
    res.render("index", renderPage);
})



module.exports = router
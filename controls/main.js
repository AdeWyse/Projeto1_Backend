const express = require('express')
const router = express.Router()
const Pokemon = require("../models/Pokemon")

router.get("/", (req, res) => {
    let error = ""
      //Pegar lista de pokemons
      var pokemons = Pokemon.list();
    //Seta elementos do template para a home
      renderPage = {
        pokemonList: pokemons,
        css: "../css/home.css",
      };
    res.render("index", renderPage);
})



module.exports = router
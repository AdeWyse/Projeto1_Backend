const path = require('path');
const { existsSync, readFileSync, writeFileSync,unlinkSync } = require('fs');

const pokemonPath = path.join(__dirname, "../pokemons");

module.exports = {
    process(pokemon) {
        const nome = pokemon.nome;
        const pokemonFile = path.join(pokemonPath, `${nome}.txt`);
        if (existsSync(pokemonFile)) {
            return this.update(pokemon);
        } else {
            return this.new(pokemon);
        }
    },
    new(pokemon) {
        try {
            const nome = pokemon.nome;
            const pokemonFile = path.join(pokemonPath, `${nome}.txt`);
            writeFileSync(pokemonFile, JSON.stringify(pokemon), 'utf8');
            return true;
        } catch (error) {
            return "Error criando esse pokemon: ", error;
        }
    },
    update(pokemon) {
        try {
            const nome = pokemon.nome;
            if(pokemon.imagem == ""){
                pokemon.imagem = pokemon.originalImagem
                delete pokemon.originalImagem;
            };
            const pokemonFile = path.join(pokemonPath, `${nome}.txt`);
            writeFileSync(pokemonFile, JSON.stringify(pokemon), 'utf8');
            return true;
        } catch (error) {
            return "Error editando esse pokemon: ", error;
        }
    },
    list() {
    },
    getPokemonByName(name) {
        const pokemonFile = path.join(pokemonPath, `${name}.txt`);
        if (existsSync(pokemonFile)) {
            const content = readFileSync(pokemonFile, 'utf8');
            return JSON.parse(content);
        } else {
            return null;
        }
    },
    delete(name) {
        try {
            const pokemonFile = path.join(pokemonPath, `${name}.txt`);
            if (existsSync(pokemonFile)) {
                unlinkSync(pokemonFile); // Adicionando o módulo fs corretamente
                return true;
            } else {
                return "O arquivo do Pokémon não existe.";
            }
        } catch (error) {
            return "Erro ao excluir o arquivo do Pokémon: " + error;
        }

    }
};

const path = require('path');
const { existsSync, readFileSync, writeFileSync, unlinkSync, readdirSync} = require('fs');

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
            if(pokemon.imagem == "" || pokemon.imagem == null){
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
    list(){
        const pokemonFiles = readdirSync(pokemonPath); // Pegar files da pasta
    
        const pokemonList = pokemonFiles
            .filter(file => file.endsWith('.txt')) // Filtrar por .txt
            .map(file => {
                const filePath = path.join(pokemonPath, file); 
                const content = readFileSync(filePath, 'utf8'); 
                return JSON.parse(content); 
            });
    
        return pokemonList.length > 0 ? pokemonList : null;
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
            console.log(pokemonFile)
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

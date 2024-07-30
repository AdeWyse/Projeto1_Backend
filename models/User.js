const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const DATA_FILE = path.join(__dirname, '..', 'users', 'users.json');

//Carrega todos os usuários salvos em 'users/users.json'
const fetchAll = () => {
    if(!existsSync(DATA_FILE)){
        return []
    }

    const data = readFileSync(DATA_FILE);
    return JSON.parse(data);
}

//Salva todos os usuários em 'users/users.json'
const saveAll = (users) => {
    const data = JSON.stringify(users,null,2);
    writeFileSync(DATA_FILE, data);
}

//Cria um novo usuário e o salva
const createUser = (email, password) => {
    const users = fetchAll();
    const newUser = { email, password };

    const userExists = findByEmail(email);

    if(userExists != null){
        return null;
    }

    users.push(newUser);
    saveAll(users);

    return newUser;
}

//Busca um usuário pelo e-mail
const findByEmail = (email) => {
    const users = fetchAll();
    return users.find(user => user.email === email);
}

module.exports = {
    fetchAll,
    createUser,
    findByEmail
}
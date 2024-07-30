# Dexplorer

Dexplorer é um sistema de gerenciamento de conteúdo (CMS) focado no mundo Pokémon. Este projeto permite que os usuários criem posts sobre Pokémons e que os administradores gerenciem esses posts com permissões adicionais para editar ou excluir conteúdo.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Rotas da API](#rotas-da-api)
- [Permissões](#permissões)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Instalação

Clone o repositório, entre em sua pasta e execute a instalação:
   ```
   git clone https://github.com/seu-usuario/dexplorer.git
   cd explorer
   npm install
   ```

## Configuração

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:
```
    SECRET={string secret}
    PORT={porta em que o projeto será executado}
    ADMIN={e-mail administrador}
    PASSWORD={senha do administrador}
```

## Uso
Inicie o servidor:
`npm start`

Acesse o aplicativo no navegador, substituindo PORT pela porta descrita no `.env`:
`http://localhost:{PORT}`

## Rotas

#### 1. Rotas de Pokémon

##### a. Criação de Pokémon
**`GET /pokemon/new`**
Descrição: Renderiza o formulário para criar um novo Pokémon.
Middleware: checkUser (verifica se o usuário está autenticado).

**`POST /pokemon/new`**
Descrição: Recebe os dados do formulário e cria um novo Pokémon. Se a validação falhar, renderiza o formulário novamente com erros.
Middleware: checkUser (verifica se o usuário está autenticado), imgHandler.upload.single("imagem") (processa o upload da imagem).


##### b. Edição de Pokémon
**`GET /pokemon/update`**
Descrição: Renderiza o formulário para editar um Pokémon existente, carregando dados do Pokémon para preencher o formulário.
Middleware: checkAdmin (verifica se o usuário é um administrador).

**`POST /pokemon/update`**
Descrição: Recebe os dados do formulário para atualizar um Pokémon existente. Se a validação falhar, renderiza o formulário novamente com erros.
Middleware: checkAdmin (verifica se o usuário é um administrador).

##### c. Visualização de Pokémon
**`GET /pokemon`**
Descrição: Renderiza a página com detalhes de um Pokémon específico.

##### d. Exclusão de Pokémon
**`GET /pokemon/delete`**
Descrição: Exclui um Pokémon e redireciona para a lista de Pokémon. Se o Pokémon não for encontrado, redireciona para a página inicial.
Middleware: checkAdmin (verifica se o usuário é um administrador).

#### 2. Rotas da Página Inicial
**`GET /`**
Descrição: Renderiza a página inicial com a lista de todos os Pokémon.

#### 3. Rotas de Autenticação e Registro
##### a. Login
**`GET /login`**
Descrição: Renderiza o formulário de login.

**`POST /login`**
Descrição: Processa o login do usuário. Se o e-mail e senha estiverem corretos, o usuário é redirecionado para a página inicial. Caso contrário, renderiza o formulário de login com um erro.

##### b. Logout
**`GET /logout`**
Descrição: Faz o logout do usuário, destruindo a sessão e redirecionando para a página inicial.

##### c. Registro
**`GET /register`**
Descrição: Renderiza o formulário de registro de novos usuários.

**`POST /register`**
Descrição: Processa o registro de um novo usuário. Se as senhas não corresponderem ou o e-mail já estiver registrado, renderiza o formulário de registro com um erro.

## Permissões

Usuários Comuns: Podem criar novos posts.
Administradores: Podem editar ou excluir qualquer post.

## Tecnologias utilizadas
- Node.js
- Express.js
- Mustache

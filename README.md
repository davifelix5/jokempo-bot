# Jokempo Bot 🪨📜✂️

## ❓ O que é 

- Esse projeto é um bot para a plataforma [Discord](https://discord.com/) <img src="https://emoji.discord.st/emojis/Discord_Icon.png" width="15px" />
- Permite um jogo de **pedra, papel e tesoura** entre os participantes de um servidor
- O resultado de cada jogo é armazenado em um banco de dados, o que permite a construção de um ranking baseado em diferentes parâmetros
  - Vitórias (padrão)
  - Derrotas
  - Empates
  - Jogos recusados
  
## Tecnologias 💻

- Javascript <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/f994c418a134b58c4aec11152f6a4a33fa89da26/programming%20languages/javascript.svg" width="15px" />
- [Node JS](https://nodejs.org/en/)
- [Discord.js](https://discord.js.org/#/)
- [Knex JS](https://knexjs.org/)
- [PosetgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Aprendizados 📚

- Melhores práticas para um código mais legível
- Uso básico de Docker para desenvolvimento
- Consultas mais avançadas no banco de dados

<h2 id="notas">Notas 📋</h2>

- Desde o tempo da criação desse projeto. A API do Discord foi atualizada, havendo a criação dos [slash commands](https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands), uma melhor forma de gerir comandos sem processar todas as mensagens enviadas.
- Como o projeto foi feito como forma de aprendizado e não para um uso real, o código não incorporou essa atualização, o que está em planos futuros.
- Para atualizar o projeto, qualquer <a href="#contribuir">contribuição</a> é bem vinda!

## Rodar no seu servidor ⚙️

- Entre nesse link de convite: [Convide o Bot para seu servidor](https://discord.com/oauth2/authorize?client_id=806475125959688213&permissions=413592398912&scope=bot)
- Selecione o servidor no qual deseja utilizar o bot
- Digita `.help` para começar a jogar

## Amostra da aplicação 🚀

- O bot é usado a partir de comandos digitados nos chats em quais ele tem permissão para estar
- Todos os comandos e seus respectivos argumentos são validados

<p align="center">
 <br />
 <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/validation.png?raw=true" />
</p>

- Para ter uma lista de comandos, o usuário pode digitar `.jokempo`

<p align="center">
 <br />
 <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/help.png?raw=true" />
</p>

### Ranking 📊

- No ranking, é possível escolher o critério e a organização a ser usada 

<p align="center">
  <p align="center">
   <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/rank.png?raw=trueg" width="500px"/>
  </p>
  
  - Exemplos para tipos de ranking
  
  <p align="center">
   <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/rank1.png?raw=true" width="400px"/>
   <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/rank2.png?raw=true" width="400px"/>
  </p>
  
  - Passando de páginas pela reação (para testes, a quantidade de registros por página foi reduzido para um)
  
  <p align="center">
   <br />
   <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/rank3.png?raw=true" width="400px"/>
   <img src="https://github.com/davifelix5/jokempo-bot/blob/main/github-assets/rank4.png?raw=true" width="450px"/>
  </p>
 </p>
 
## Todo List 📝

- [x] Isolar a lógica de registro para um comando separado
- [x] Tornar a foreign key do usuário composta a fim de suportar o registro de um mesmo usuário em diferentes servidores
- [x] Consertar o erro foreign key quando um usuário tenta cancelar seu registro
- [ ] Abstrair a lógica paginação

<h2 id="contribuir">Como contribuir 🤝</h2>
<p>
  <a href="#notas">Voltar para "Notas"</a>
</p>


- Clone o repositório

```
git clone https://github.com/davifelix5/jokempo-bot.git
```

- Instale os pacotes: `yarn` ou `npm install`
  
- Crie uma aplicação no Discord Developer Portal e entre com o Bot no seu servidor do Discord para testes (segue um [tutorial](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) na documentação do próprio `Discord.js`

- Crie um arquivo `.env` com o token do Bot criado e com as informaçoes do banco de dados (as informações desse arquivo devem coincidir com as do arquivo `docker-composer.yml`)
```
TOKEN=seu_token
PG_DATABASE=seu_user
PG_HOST=127.0.0.1
PG_PASSWORD=sua_senha
PG_USER=postgresPG_PORT=8001
```

- Suba o container
```
docker-compose up -d
```
- Faça as migrations: `yarn knex migrate:latest` ou `npx knex migrate:latest`

- Rode o projeto: `yarn dev` ou `npm run dev`

 const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping reconhecido por uptime robot...${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

//Pagina da web de ping
//----------------------------------------------------------------------------------------

const Discord = require("discord.js");
const db = require("quick.db"); 
const Enmap = require('enmap');
const fs = require('fs')
const client = new Discord.Client(); 
const config = require("../config.json"); 

//consts e requires
//----------------------------------------------------------------------------------------

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
          let commandName = file.split('.')[0];

                      //console

      console.log(`Analisando comando da pasta: "${commandName}"`);
      client.commands.set(commandName, props);
      console.log(`inicilizando comando...`);
    });
});

//Handler
//----------------------------------------------------------------------------------------

client.on('ready', () => {
  let palavras = [
    `- Corrida de cavalo.`,
    `- Estou aberto a denúncias`,
    `- Qualquer dúvida ou bug entre em contato com @Doker`,
    `- Ex traficante.`,
    `- Gerenciando o cassino.`,
    `- Já pegou seu daily hoje? rs. `,
    `- Meu prefix é $`,
    `- Poker.`
  ]
  inc = 0
  setInterval(() => client.user.setActivity(`${palavras[inc++ % palavras.length]}`, {type: `PLAYING`}), 1000 * 10)
})

//statusbot
//----------------------------------------------------------------------------------------

client.login(process.env.TOKEN); //conexão com o token no documento .env
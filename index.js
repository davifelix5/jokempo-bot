require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./src/commands')

client.once('ready', () => {
    console.log('Bot working!');
})

client.on('message', message => {
    
    if (!message.content.startsWith('.') || message.author.bot)
        return;

    const [command, ...args] = message.content.split(' ').filter(Boolean)
    
    if (!Object.keys(commands).find(item => item == command))
        return message.channel.send({embed: {
            color: '#d05353',
            title: 'Erro',
            description: 'Comando desconhecido'
        }})

    const service = commands[command];

    service.index(message, args);

})

client.login(process.env.TOKEN);
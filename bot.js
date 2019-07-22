const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const bot = new Discord.Client();

bot.on('ready', () =>{
    console.log('This bot is online!');
})

cleint.login(process.env.BOT_TOKEN);

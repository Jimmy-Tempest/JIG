const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');
const fetch = require("node-fetch");




bot.once('ready', () => {
	console.log('Bot is online!');
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

	if (message.content === `${prefix}ping`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    
    } else if (message.content === `${prefix}verify`) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('You have been verified.');
        let role = message.guild.roles.cache.find(role => role.name === "Verified")
        message.member.roles.add(role).catch(console.error);
    
    } else if (command === `${prefix}prune`){
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount < 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    
    }else if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    
    }else if (message.content === `${prefix}user-info`) {
        
        if (!message.mentions.users.size) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        }
        const infoList = message.mentions.users.map(user => {
            return `${user.username}'s username: ${user.username} \n${user.username}'s ID: ${user.id}`;
        });
        message.channel.send(infoList);
    }else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    
    }else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    
    }else if (command === 'covid') {
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                data["Thailand"].forEach(({ date, confirmed, recovered, deaths }) =>
                message.channel.send(`${date} active cases: ${confirmed - recovered - deaths}`)
                );
            });       

    }else if (message.content === `${prefix}send`) {
        message.channel.bulkDelete(1).then(
            message.channel.send(`You're not`)
        )
        
    }else if (message.content === `${prefix}join`) {
        const channel = bot.channels.cache.get("694175622703874078");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
        }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
        });
        
        
    } 
});

bot.on('ready', () => {
	bot.user.setStatus('dnd', '¬‿¬')
});


bot.login(token);
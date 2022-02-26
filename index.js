Discord = require("discord.js")
const fs = require('fs');

global.bot = new Discord.Client({
      autoReconnect:true,
});

bot.commands = new Discord.Collection();

let count_cmd = 0;
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      bot.commands.set(command.name, command);
      count_cmd++;
}

let count_ev = 0;
  const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    delete require.cache[require.resolve(`./events/${file}`)];
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null,bot));
    count_ev++;
}

bot.login(config.token)
      .then(r=>{
    console.clear()
            console.log(" - Login: " + bot.user.tag)
                 console.error(" ")
    }).catch(e => {
    	console.clear()
       console.error(" - Error: " + e) 
          console.error(" ")
});

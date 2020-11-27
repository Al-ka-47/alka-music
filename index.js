const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.js");
client.config = config;
client.queue = new Map()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                      Lecture du dossier events et commands                                             //////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Tentative de chargement de la commande ${commandName}`);
    client.commands.set(commandName, props);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                              Statut dynamique du bot                                                   //////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
  const statuses = [
    () => `Sunbelt`,
    () => `-aide pour la page d'aide`
]
let i = 0
setInterval(() => {
    client.user.setActivity(statuses[i](), {type: 'PLAYING'})
    i = ++i % statuses.length
}, 1e4)
console.log('Connecté & prêt à être utilisé !');
console.log(`[API] Connecté à  ${client.user.username}`);
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                             Connexion au token du bot                                                  //////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(process.env.TOKEN);
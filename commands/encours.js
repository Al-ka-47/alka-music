const Discord = require('discord.js');
exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('🔊 **Vous devez rejoindre un salon vocal avant d\'utiliser cette commande.**');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send("🎶 **Aucune musique en cours.**")

exports.run = async(client, message) => {

const encoursEmbed = new Discord.MessageEmbed()
	.setColor('#7ebeff')
	.setTitle('Sunbelt - Actuellement en cours')
    .addField('Titre :', queue.songs[0].title)
    .addField('Demandée par :', queue.songs[0].requester)
	.setTimestamp()
	.setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png');

message.channel.send(encoursEmbed);
}
}
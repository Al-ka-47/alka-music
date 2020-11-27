const { MessageEmbed } = require('discord.js')

exports.run = async (client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('🔊 **Vous devez rejoindre un salon vocal avant d\'utiliser cette commande.**');
    const queue = message.client.queue.get(message.guild.id)
    let status;
    if(!queue) status = '📑 **Il n\'y a rien dans la file d\'attente.**'
    else status = queue.songs.map(x => '• ' + x.title + ' -Demandée par ' + `<@${x.requester.id}>`).join('\n')
    if(!queue) np = status
    else np = queue.songs[0].title
    if(queue) thumbnail = queue.songs[0].thumbnail
    else thumbnail = message.guild.iconURL()
    let embed = new MessageEmbed()
    .setTitle('Sunbelt - File d\'attente')
    .setColor('#7ebeff')
    .addField('En cours : ', np, true)
    .setDescription(status)
    .setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png');
    message.channel.send(embed)
}
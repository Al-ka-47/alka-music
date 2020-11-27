exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('🔊 **Vous devez rejoindre un salon vocal avant d\'utiliser cette commande.**');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send({
        embed: {
            description: '❌ **Aucune musique n\'est en cours de lecture.**',
        }
    })
    message.react('⏹️')
    queue.songs = []
    queue.connection.dispatcher.end('⏹️ **Musique stopper.**')
}
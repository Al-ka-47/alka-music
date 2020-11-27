exports.run = async(client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('🔊 **Vous devez rejoindre un salon vocal avant d\'utiliser cette commande.**');
    const queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send('❌ **Aucune musique n\'est en cours de lecture.**')
    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    message.channel.send(`🔀 **Mélange aléatoire de la liste d'attente effectué.**`).catch(console.error);
}

const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const discord = require('discord.js')

exports.run = async (client, message, args) => {

    if(!args[0]) return message.channel.send('🔊 **Vous n\'avez pas la permission de proposer une musique.**')
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send('🔊 **Vous devez rejoindre un salon vocal avant de lancer une musique.**')

    if (!channel.permissionsFor(message.client.user).has("CONNECT")) return message.channel.send('❌ **Je n\'ai pas la permission de rejoinndre le salon vocal.**')
    if (!channel.permissionsFor(message.client.user).has("SPEAK"))return message.channel.send('❌ **Je n\'ai pas la permission de parler dans le salon vocal.**')


    const server = message.client.queue.get(message.guild.id);
    let video = await scrapeYt.search(args.join(' '))
    let result = video[0]

    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        upload: result.uploadDate,
        views: result.viewCount,
        requester: message.author,
        channel: result.channel.name,
        channelurl: result.channel.url
      };

    var date = new Date(0);
    date.setSeconds(song.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);

      if (server) {
        server.songs.push(song);
        console.log(server.songs);
        let embed = new discord.MessageEmbed()
        .setColor('#7ebeff')
        .setTitle('Sunbelt - Ajout à la file d\'attente', song.title, true)
        .setThumbnail(song.thumbnail)
        .addField('Vues', song.views, true)
        .addField('Demandée par', song.requester, true)
        .addField('Durée', timeString, true)
        .setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png')
        return message.channel.send(embed)
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);


    const play = async song => {
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
            queue.voiceChannel.leave();
            message.client.queue.delete(message.guild.id);
            message.channel.send('🎶 **Il n\'y a pas de musique dans la liste d\'attente, je quitte le salon vocal.**')
            return;
        }

        const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
            filter: format => ['251'],
            highWaterMark: 1 << 25
        }), {
            type: 'opus'
        })
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        let noiceEmbed = new discord.MessageEmbed()
        .setTitle('Sunbelt - Lecture en cours')
        .setColor('#7ebeff')
        .setThumbnail(song.thumbnail)
        .addField('Titre', song.title, true)
        .addField('Démandée par', song.requester, true)
        .addField('Vues', song.views, true)
        .addField('Durée', timeString, true)
        .setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png')
        queue.textChannel.send(noiceEmbed);
    };


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.error(`❌ **Je n'arrive pas à rejoindre le salon.**`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`❌ **Je n'arrive pas à rejoindre le salon vocal : ${error}**`);
    }
}
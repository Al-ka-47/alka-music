const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("🎶 **Aucune musique en cours.**").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `❌ **Aucun lyrics trouvé pour ${queue.songs[0].title}**`;
    } catch (error) {
      lyrics = `❌ **Aucun lyrics trouvé pour ${queue.songs[0].title}**`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`Sunbelt - Lyrics pour ${queue.songs[0].title}`)
      .setDescription(lyrics)
      .setColor("#7ebeff")
      .setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png')
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
}

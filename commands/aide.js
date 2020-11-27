const Discord = require('discord.js');
const { prefix } = require('../config');

exports.run = async(client, message) => {

const aideEmbed = new Discord.MessageEmbed()
	.setColor('#7ebeff')
	.setTitle('Sunbelt - Page d\'aide')
	.setDescription('Le préfixe du bot est : ``-``\n\n``aide`` **-** Affiche la page d\'aide.\n``play`` **-** Jouer une musique via un lien YouTube ou le titre.\n``pause`` **-** Met en pause la musique.\n``relancer`` **-** Relance la musique.\n``encours`` **-** Affiche la musique en cours de lecture.\n``lyrics`` **-** Affiche les lyrics de la musique en cours de lecture.\n``mélange`` **-** Mélange la file d\'attente.\n``file`` **-** Affiche la file d\'attente\n``skip`` **-** Passe la musique en cours de lecture.\n``stop`` **-** Arrête la musique en cours de lecture et fais quitter le bot.\n``volume`` **-** Change le volume de lecture de la musique.\n\n❄️ __Réalisé exclusivement pour le serveur RolePlay SunBelt.__')
	.setTimestamp()
	.setFooter('Sunbelt - Music', 'https://i.imgur.com/ZPzNMp7.png');

message.channel.send(aideEmbed);
}

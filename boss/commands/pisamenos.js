const Discord = require('discord.js');

module.exports = {
  name: 'step',
  aliases: ['step', 'pisar'],
  cooldown: 3,
  guildOnly: true,
  async run(client, message, args) {
    const list = [
      'https://cdn.discordapp.com/attachments/745396328351268885/776930400990920734/6a0.gif',
      'https://cdn.discordapp.com/attachments/745396328351268885/776930405181554698/tenor_10.gif',
      'https://cdn.discordapp.com/attachments/745396328351268885/776930416966893588/tenor_8.gif',
    ];

    const rand = list[Math.floor(Math.random() * list.length)];
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.FoxyReply('Mencione um usuário para continuar.');
    }

    const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`${message.author} Pisa menos mana, pisou em ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setFooter('');
    await message.FoxyReply(embed);
  },

}

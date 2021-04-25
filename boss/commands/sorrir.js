const Discord = require('discord.js');

module.exports = {
  name: 'smile',
  aliases: ['smile', 'sorrir'],
  cooldown: 3,
  guildOnly: false,
  async run(client, message, args) {
    const sayMessage = args.join(' ');

    const list = [
      'https://cdn.zerotwo.dev/SMILE/0db9c7c4-5de8-4a64-ba5f-0b67987ffeb0.gif',
      'https://cdn.zerotwo.dev/SMILE/d2151a20-21d3-4c49-9ff9-81863937ec7e.gif',
      'https://cdn.zerotwo.dev/SMILE/8a68a937-a027-4948-be06-fb5f0f7207a4.gif',
    ];

    const rand = list[Math.floor(Math.random() * list.length)];

    const avatar = message.author.displayAvatarURL({ format: 'png' });
    const embed = new Discord.MessageEmbed()
      .setColor('#FFFF00')
      .setDescription(`${message.author} Está feliz! ${sayMessage}`)
      .setImage(rand)
      .setTimestamp()
      .setFooter('')
      .setAuthor(message.author.tag, avatar);
    await message.FoxyReply(embed);
  },

}

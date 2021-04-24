const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
  name: 'pay',
  aliases: ['pay', 'pagar'],
  cooldown: 5,
  guildOnly: true,

  async run(client, message, args) {
    const payEmbed = new MessageEmbed()
      .setColor(client.colors.green)
      .setTitle('💸 | `f!pay`')
      .setDescription("Você está devendo ou querendo ajudar um amigo com reaus?, então esse é o comando!\n\n 📚 **Exemplos**")
      .addFields(
      { name: "🔹 Pagar pessoa via menção", value: "`$pay @Beamer_Girl#5831 500`"},
      { name: "🔹 Pagar 1000 reaus", value: "$pay Doker ᶜˢˢ#3836 1000`"},
      ) 
      .setFooter(`• Autor: ${message.author.tag} - Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));

    const user = message.mentions.members.first();

    if (user == message.author.id) return message.FoxyReply('Você não pode tentar fazer um bug.');
    if (!user) {
      return message.FoxyReply(payEmbed);
    }

    if (isNaN(args[1])) return message.FoxyReply('Digite números válidos!');

    if (!args[1]) {
      return message.FoxyReply('Escolha um valor para continuar.');
    }

    if (message.content.includes('-')) {
      return message.FoxyReply('Você não pode transferir reaus negativos');
    }

    const fetchValue = db.fetch(`coins_${message.author.id}`);

    if (args[1] > fetchValue) return message.FoxyReply('Você não tem reaus suficientes');

    message.FoxyReply(`💸 **|** Você quer mesmo transferir ${args[1]} reaus para ${user.user}? \nA nossa equipe não é responsável caso seja roubado, pague somente para pessoas de confiança. \nÉ proibido usar a moeda REAU para NSFW+18, isso pode acabar em punição`).then((sentMessage) => {
      sentMessage.react('✅');
      const filter = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
      const Collector = sentMessage.createReactionCollector(filter, { max: 1, time: 60000 });

      sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })

      Collector.on('collect', () => {
        message.FoxyReply(`Você deu ${args[1]} reaus para ${user.user}`);
        db.add(`coins_${user.id}`, args[1]);
        db.subtract(`coins_${message.author.id}`, args[1]);
      })

    });
  },
}

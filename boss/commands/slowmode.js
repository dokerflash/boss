module.exports = {
  name: 'slowmode',
  aliases: ['slowmode', 'modolento', 'lento'],
  cooldown: 3,
  guildOnly: true,
  async run(client, message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.FoxyReply(
        '<:WindowsShield:777579023249178625> | Você precisa da permissão "GERENCIAR MENSAGENS" para continuar'
      );
    }
    if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
      message.FoxyReply('ERRO - PERMISSÃO FALTANDO - "GERENCIAR CANAIS"');
    }
    if (!args[0]) return message.FoxyReply('Escolha o tempo em segundos. (de 1 até 21600 Segundos)');
    const duration = args[0];
    if (args[0] > 21600) return message.FoxyReply('Utilize apenas de 1 até 21600 segundos ');
    if (isNaN(args[0])) return message.FoxyReply('Utilize apenas números');
    message.channel.setRateLimitPerUser(duration)
      .catch(() => {
        message.FoxyReply('Falha ao definir o modo lento neste canal, verifique o comprimento do modo lento.');
      });
    message.FoxyReply(`:turtle: Eu coloquei o modo lento para ${duration} segundos!`);
  },
}

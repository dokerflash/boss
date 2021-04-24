module.exports = {
  name: 'lock',
  aliases: ['lock', 'trancar', 'bloquear'],
  cooldown: 2,
  guildOnly: true,

  async run(client, message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) { return message.FoxyReply('Você precisa de permissão para isso, "GERENCIAR CANAIS".'); }
    const role = await message.guild.roles.cache.find((x) => x.name === '@everyone');

    await message.channel.updateOverwrite(role, {
      SEND_MESSAGES: false,
      EMBED_LINKS: false,
      ATTACH_FILES: false,
      ADD_REACTIONS: false,
    });
    message.FoxyReply(':lock: **|** Canal bloqueado, voltem aqui depois.');
  },

};
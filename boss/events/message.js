module.exports = (client, message) => {
  // Ignore all bots
  const prefix = "$";
  if (message.author.bot) return;

  // Ignora as mensagens que não possui o prefix
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Pega a data do commands e leva até o commands.events
  const cmd = client.commands.get(command);

  if (!cmd) return;

  // Roda o comando escolhido.
  cmd.run(client, message, args);
};
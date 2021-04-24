const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bet",
    aliases: ['bet', 'apostar'],
    guildOnly: true,
    cooldown: 10,
    async run(client, message, args) {
        const user = message.mentions.users.first()
        const noargs = new MessageEmbed()
        .setColor(client.colors.default)
        .setTitle('💸 | `$bet`')
        .setDescription("Aposte com um(a) amiga(o) no coinflip!\n\n 📚 **Exemplos**")
        .addFields(
            { name: "🔹 Apostando cara com 10000 reaus.", value: "`$bet Beamer_Girl#5831 cara 5000`"},
            { name: "🔹 Apostando coroa com 5000 reaus", value: "`$bet Doker ᶜˢˢ#3836 coroa 10000`"},

            )
            .setFooter(`• Autor: ${message.author.tag} - Economia`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));
        if(!user) return message.FoxyReply(noargs)
        let reply = `${user}, Você quer fazer uma aposta de ${args[2]} reaus com ${message.author}?`

        const authorbal = await db.fetch(`coins_${message.author.id}`)
        const userbal = await db.fetch(`coins_${user.id}`)
    
        if(userbal < args[2]) {
            return message.FoxyReply(`💸 **|** ${user} Não tem reaus para essa aposta`)
        } 

        if(authorbal < args[2]) {
            return message.FoxyReply(`Você não tem reaus para essa aposta.`)
        }

        if(!args[2]) return message.FoxyReply(noargs)

        if(isNaN(args[2])) return message.FoxyReply('Digite um número válido.')
        if(user == client.user) reply = "Vamos apostar!"
        message.FoxyReply(reply).then((msg) => {

            setTimeout(() => msg.react('✅'),
            1000);
            
            const filterYes = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === user.id;
            const yesCollector = msg.createReactionCollector(filterYes, { max: 1, time: 60000 });
            yesCollector.on('collect', () => {

                const array1 = ['cara', 'coroa'];

                const rand = Math.floor(Math.random() * array1.length);
        
                if (!args[1] || (args[1].toLowerCase() !== 'cara' && args[1].toLowerCase() !== 'coroa')) {
                    message.FoxyReply(noargs);
        
                  } else if (args[1].toLowerCase() == array1[rand]) {
        
                    message.FoxyReply(`💸 **|** Deu **${array1[rand]}**, você ganhou!, financiado por ${user}.`);
                    db.add(`coins_${message.author.id}`, args[2])
                    db.subtract(`coins_${user.id}`, args[2])
        
                  } else if (args[1].toLowerCase() != array1[rand]) {
                    message.FoxyReply(`💸 **|** Deu **${array1[rand]}**, você perdeu! ${user} você ganhou ${args[2]} reaus, financiado por ${message.author}.`);
                    db.add(`coins_${user.id}`, args[2])
                    db.subtract(`coins_${message.author.id}`, args[2])
                  }
                
        
        
            })
        })
       
        
    }
}
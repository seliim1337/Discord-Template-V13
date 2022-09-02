import { MessageEmbed } from "discord.js"

export const data = {
	name: "ping",
    description: "It helps you te get information about the speed of the bot.",
    category: "bot",
	execute(interaction) {

      const {emoji, ws, username, user} = interaction.client
      const start = Date.now()
      const response = new MessageEmbed()

            .setColor('#f0f0f0')
            .setTitle(user.username + " - Pong!")
            .setThumbnail(user.displayAvatarURL())
            .addFields([
                { name: `${emoji("planet")} Discord Delay`, value: `\`${Date.now() - start}ms\`` },
                { name: `${emoji("planet")} Message Delay`, value: `\`${Date.now() - start}ms\`` },
                { name: `${emoji("planet")} Bot Ping`, value: `\`${Math.round(ws.ping)}ms\`` }
            ])
            .setTimestamp()
            .setFooter({ text: `Suel Moderation Bot` })
            interaction.reply({ embeds: [response] }).catch(e => { });


	}
}

export const slash_data = {
    name: data.name,
    description: data.description
}
import { MessageEmbed } from "discord.js"

export const data = {
	name: "help",
    description: "Gives information about the command you want to get information about",
    category: "general",
    permission: "SEND_MESSAGES",
	execute(interaction) {

        const {embed, commands } = interaction.client
        const commandName = interaction.options._hoistedOptions[0].value
        if (!commands.has(commandName)) return interaction.reply({embeds: [embed (`\`${commandName}\` The Command Named was Not Found!`, "INFO")]})
        const command = commands.get(commandName).data


            const response = new MessageEmbed()
            .setColor("#f0f0f0")
            .addFields(
                {name: "Command Name", value: command.name, inline: true},
                {name: "Cooldown time", value: `${command.cooldown || 5} Saniye`, inline: true},
                {name: "Description", value: command.description}
                )
            .setTimestamp()
            .setFooter({ text: `Suel Moderation Bot` })
            interaction.reply({ embeds: [response] }).catch(e => { });
	}
}

    export const slash_data = {
        name: data.name,
        description: data.description,
        options: [
        {
            name: "command_name",
            description: "Type the name of the command you want to get information from",
            type: 3,
            required: true,
            autocomplete: true
        }
    ]}

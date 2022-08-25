import { MessageEmbed } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
	name: "help",
    description: "Gives information about the command you want to get information about",
    category: "general",
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

export const slash_data = new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)
.addStringOption(option => 
                option.setName("command_name")
                .setDescription("Type the name of the command you want to get information from")
                .setRequired(true)
                .setAutocomplete(true)
    )
import { MessageEmbed } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
	name: "avatar",
    description: "Shows the avatar of the person you are talking about",
    category: "general",
	execute(interaction) {
       
        const target = interaction.options._hoistedOptions?.[0]?.member || interaction.member
        const avatar = target.displayAvatarURL({dynamic: true, size: 1024})
        const png = target.displayAvatarURL({dynamic: true, size: 1024, format: "png"})
        const jpg = target.displayAvatarURL({dynamic: true, size: 1024, format: "jpg"})
        const jpeg = target.displayAvatarURL({dynamic: true, size: 1024, format: "jpeg"})
        const webp = target.displayAvatarURL({dynamic: true, size: 1024, format: "webp"})

        const responseEmbed = new MessageEmbed()
        .setTitle(`${target.displayName} User's Avatar`)
        .setColor("#f0f0f0")
        .setDescription(`[PNG](${png}) | [JPG](${jpg}) | [JPEG](${jpeg}) | [WEBP](${webp})`)
        .setImage(avatar)

        interaction.reply({ embeds: [responseEmbed] }).catch(e => { });

	}
}



export const slash_data = new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)
.addUserOption(option => 
        option.setName("user")
        .setDescription("Please tag the user")
    )
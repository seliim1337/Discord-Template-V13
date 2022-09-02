import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js"

export const data = {
            name: "avatar",
            description: "Shows the avatar of the person you are talking about",
            category: "general",
            permission: "SEND_MESSAGES",
	execute(interaction) {

        
        const {emoji} = interaction.client
        const target = interaction.options._hoistedOptions?.[0]?.member || interaction.member
        const avatar = target.displayAvatarURL({dynamic: true, size: 2048})
        const png = target.displayAvatarURL({dynamic: true, size: 2048, format: "png"})
        const jpg = target.displayAvatarURL({dynamic: true, size: 2048, format: "jpg"})
        const jpeg = target.displayAvatarURL({dynamic: true, size: 2048, format: "jpeg"})
        const webp = target.displayAvatarURL({dynamic: true, size: 2048, format: "webp"})
        /* Avatar link button */
        const row = new MessageActionRow()
        .addComponents(
        new MessageButton()
            .setLabel('Avatar Link')
            .setURL(avatar)
            .setStyle('LINK')
        );
        /* Description */
        const responseEmbed = new MessageEmbed()
        .setTitle(`${target.displayName} User's Avatar`)
        .setColor("#f0f0f0")
        .setDescription(`${emoji("link")} [Click To Open It in the Browser](${webp})`)
        /* Farklı bir Description
        .setDescription(`${emoji("link")} [PNG](${png}) | [JPG](${jpg}) | [JPEG](${jpeg}) | [WEBP](${webp})
        */
        .setImage(avatar)

        interaction.reply({ embeds: [responseEmbed], components: [row]  }).catch(e => { });
	}
}


export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
    {
        name: "user",
        description: "Please tag the user",
        type: 6
    }
]
}
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js"

export const data = {
    name: "Banner",
    category: "context",
    permission: "SEND_MESSAGES",

    execute(interaction) {
        const {emoji} = interaction.client
        const member = interaction.options.getMember('user') || interaction.member 
        const Target = interaction.options._hoistedOptions?.[0]?.member ? interaction.client.users.fetch(interaction.options._hoistedOptions?.[0]?.member.id, {force: true}) : interaction.client.users.fetch(interaction.user.id, {force: true})
        
        Target.then(x => {
            const Embedd = new MessageEmbed()
                .setColor('#f0f0f0')
                .setDescription("User doesn't have banner.")
            if (!x.bannerURL()) return interaction.reply({
                embeds: [Embedd]
            })

            const Row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Banner Link')
                        .setURL(x.bannerURL({dynamic: true, size: 2048}))
                )

            const Embed = new MessageEmbed()
                .setAuthor({ name: `Banner of ${x.tag}`, iconURL: member.user.displayAvatarURL()})
                .setColor('#f0f0f0')
                .setDescription(`${emoji("link")} [Click To Open It in the Browser](${x.bannerURL({dynamic: true, size: 2048})})`)
                .setImage(x.bannerURL({dynamic: true, size: 2048}))

            interaction.reply({
                embeds: [Embed],
                components: [Row]
            })
        })

    }
}

export const slash_data = {
    name: data.name,
    type: 2
}
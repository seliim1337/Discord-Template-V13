import { MessageEmbed } from "discord.js"
import { stripIndents } from "common-tags"

export const data = {
    name: "userinfo", 
    description: "It gives information about the user.",
    category: "general",
    permission: "SEND_MESSAGES",
    execute(interaction) {
        
const {emoji} = interaction.client
const member = interaction.options.getMember('user') || interaction.member 
const badgeEmojis = {
    'BUGHUNTER_LEVEL_1': '<:discord_bughunterv1:1007605599019745291>',
    'BUGHUNTER_LEVEL_2': '<:discord_bughunterv2:1007605601095913492>',
    'DISCORD_CERTIFIED_MODERATOR': '<:discord_mod:1007605606808563793>',
    'HOUSE_BRAVERY': '<:bravery:1007605877236322345>',
    'HOUSE_BALANCE': '<:balance:1007605872102490213>',
    'HOUSE_BRILLIANCE': '<:brilliance:1007605879018893313>',
    'HYPESQUAD_EVENTS': '<:HypeSquad:1008044478713561119>',
    'PARTNERED_SERVER_OWNER': '<:discord_partner:1007605618275790868>',
    'EARLY_SUPPORTER': '<:discord_early:1007605604879175700>',
    'DISCORD_EMPLOYEE': '<:staff:1007605620125466715>',
    'VERIFIED_BOT': '<:discord_bot:1007605597040029847>',
    'EARLY_VERIFIED_BOT_DEVELOPER': '<:discord_developer:1007605602484240385>'
}
let emojilerString = ''
member.user.flags.toArray ().forEach (Flag => {
    emojilerString += badgeEmojis [Flag]
})
//member.premiumSince ? emojilerString += '<:discord_nitro:1007605608402391061> <a:discord_boost:1007605719278817311>' : ''
const status = member.presence?.status ? member.presence.status.replace("online", `${emoji("online")}Online`).replace("dnd", `${emoji("dnd")}Do Not Distrub`).replace("idle", `${emoji("idle")}Idle`) : `${emoji("offline1337")}Invisible`;
const roles = member.roles.cache.filter (Rol => Rol.id !== Rol.guild.roles.everyone.id).map (Rol => Rol).join()     

        const response = new MessageEmbed()
            .setAuthor({ name: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL()})
            .setColor("#f0f0f0")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addFields(
            {
                name: "User", value: stripIndents`
                **Name:** ${member.user.username}#${member.user.discriminator}
                **Status:** ${status}
                **Joined Discord:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:F>
                **ID:** ${member.user.id}
                `,
                inline: false
            },
             {
                name: "Member", value: stripIndents`
                **Nick Name:** <@${member.user.id}>
                **Roles:** ${roles.length > 0 ? roles : 'Bulunmuyor.'}
                **Joined Server:** <t:${Math.floor(member.joinedTimestamp / 1000)}:F>
                **ID:** ${member.user.id}
                `,
                inline: false
            },
            { 
                    name: `Badges`, 
                    value: emojilerString.length > 0 ? `> ${emojilerString}` : '> The user is poor; he has no badge.',
                    inline: true 
            } 
                );
            interaction.reply({ embeds: [response] }).catch(e => { });
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
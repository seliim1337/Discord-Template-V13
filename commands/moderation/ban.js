import { MessageEmbed } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
	name: "ban",
	description: "Bans the member you tagged from the server",
	category: "moderation",
	permission: "BAN_MEMBERS",
	cooldown: 10,
	execute(client, interaction, args) {
		const {embed} = interaction.client
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.channel.send("Üyeleri Banla Yetkiniz Yok.")
        let user = interaction.mentions.users.first();
        if(!user) return interaction.channel.send("Lütfen Banlanacak Kişiyi Belirtiniz.")
		const üye = interaction.guild.members.cache.get(user.id)
		üye.ban()

const response = new Discord.MessageEmbed()
.setColor("#5865F2")
.setDescription(`${user}, The User Has Been Successfully Banned!`)

interaction.reply({ embeds: [response] }).catch(e => { });

	}
}
export const slash_data = {
	name: data.name,
	description: data.description
}
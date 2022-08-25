import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
	name: "ban",
	description: "Bans the member you tagged from the server",
	category: "moderation",
	permission: "BAN_MEMBERS",
	cooldown: 10,
	execute(message) {
		const {embed} = message.client
		message.reply({embeds: [embed("The User Has Been Successfully Banned!")]})
	}
}
export const slash_data = new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.description)
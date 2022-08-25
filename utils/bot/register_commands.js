import {REST} from "@discordjs/rest"
import {Routes} from "discord-api-types/v9"
import {MessageEmbed} from "discord.js"

export default async guild => {

	const {client} = guild
	const rest = new REST({version: "9"}).setToken(process.env.token)
	const body = client.commands.map(command => command.slash_data)
	
	try {

		await rest.put(
				Routes.applicationGuildCommands(client.user.id, guild.id),
				{body}
			)

	} catch(e){
		if(e.code == 5001){
			const embed = new MessageEmbed()

			.setDescription("Commands could not be saved please discard the bot from the server and invite it back to the server by clicking on this [link](https://discord.com/api/oauth2/authorize?client_id=1002939983897833472&permissions=8&scope=bot%20applications.commands)!")
			.setColor("RED")

			const owner = await guild.fetchOwner()
			owner.send ({embeds: [embed]}).cache(() => { })
		}
	}
}
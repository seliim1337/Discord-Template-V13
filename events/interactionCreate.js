import cooldown_control from "../utils/cooldown_control.js"
import auto_complete from "../utils/event-utils/auto_complete.js"

export default client => {
	const {embed} = client
	client.on("interactionCreate", interaction => {
		if (interaction.isAutocomplete()) auto_complete(interaction)
		if(!interaction.isApplicationCommand()) return
		
			const command = client.commands.get(interaction.commandName)
		if(!command) return


		//Permission Control
		if (command.data.permission && !interaction.member.permissions.has(command.data.permission))return interaction.reply({
			embeds: [
			embed(`To use this command \`${command.data.permission}\` You have to have the authority.`, "RED")
			]})


		//Cooldown Control
		const cooldown = cooldown_control(command, interaction.member.id)
		if(cooldown) return interaction.reply({
			embeds: [
					embed(`To use this command again \`${cooldown}\` you have to wait a second!`, "RED")
			]
		})

		//Execute Command
		try{
			command.data.execute(interaction)
		}	catch(e){
			interaction.reply({embeds: [embed("An error occurred while using this command!", "RED")]})
			console.log(e)
		}


	})
}
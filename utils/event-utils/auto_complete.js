export default (interaction) => {

	if(interaction.commandName == "help") {
		const focusedValue = interaction.options.getFocused()
		const choices = Array.from(interaction.client.commands.filter(c => !c.slash_data.type || c.slash_data.type == 1).keys())
		const filtered = choices.filter(choice => choice.startsWith(focusedValue))
		const result = filtered.map(choice => ({name: choice, value: choice}))

		interaction.respond(result)
}}
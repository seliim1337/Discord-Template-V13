import {MessageEmbed} from "discord.js"

export default (description, color = "#f0f0f0" , title = "" ) => {

			if (color == "RED") color = "#f0f0f0"
			else if (color == "GREEN") color = "#f0f0f0"
			else if (color == "INFO") color = "#f0f0f0"
			else if (color == "WHITE") color = "#f0f0f0"


			const response = new MessageEmbed()
			.setDescription(description)
			.setColor(color)
			.setTitle(title)
			return response
}
import check_commands from "../utils/bot/check_commands.js"
import { Client } from "discord.js"
import moment from "moment"


export default client => {
	client.once("ready", () => {
		console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${client.user.username}: Active, Commands loaded!`)
		console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${client.user.username}: Currently ` + client.channels.cache.size + ` the channel ` + client.guilds.cache.size + ` the server and ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` the user are being serviced!`)
		check_commands(client)
		//client.application.commands.set([]) -- globale alınmış komutları siliyor 
	})


}



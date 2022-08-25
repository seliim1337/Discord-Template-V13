import { Client, Collection } from "discord.js"
import { readdirSync } from "fs"
import 'dotenv/config'

const client = new Client({
	intents: 131071,
	presence: {status: "dnd", activities: [{name: "Slash Commands {/}", type: "WATCHING"}]}
})

// Assigments & Emoji
client.commands = new Collection()
client.emoji = (emojiName) => client.guilds.cache.get(process.env.OWNER_GUILD_ID).emojis.cache.find(e => e.name == emojiName) || "🎉"
client.embed = await import ("./utils/bot/embed.js").then(m => m.default)

//Event Loader & Bot
readdirSync("./events").forEach(async file => {
	const event = await import(`./events/${file}`).then(m => m.default)
	event(client)
})

//Command Loader & Komutlar
readdirSync("./commands").forEach(category => {
    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`)
        command.data.category = category;
        client.commands.set(command.data.name, command)
    })
})

client.login(process.env.token)
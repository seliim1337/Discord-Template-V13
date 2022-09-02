import { Client, Collection } from "discord.js"
import { readdirSync } from "fs"
import 'dotenv/config'

const client = new Client({
	intents: 131071,
})


// Assigments & Emoji
client.commands = new Collection();

client.emoji = (emojiName) => client.guilds.cache.get(process.env.OWNER_GUILD_ID).emojis.cache.find(e => e.name == emojiName) || "🎉"
client.embed = await import ("./utils/bot/embed.js").then(m => m.default)

//Event Loader & Bot
readdirSync("./events").forEach(async file => {
	const event = await import(`./events/${file}`).then(m => m.default)

    /*console.log(`Yüklenen event: ${event dosyalarının adını çekmem gerek}.`);*/

	event(client)
})

//Command Loader & Komutlar


    readdirSync("./commands")
    .forEach(c => {
    readdirSync(`./commands/${c}`)
    .forEach(async f => {
        const command = await import(`./commands/${c}/${f}`)

        /*console.log(`Yüklenen komut: ${command.data.name}.`);*/

        command.data.c = c;
        client.commands.set(command.data.name, command)

        });
    });

client.login(process.env.token)
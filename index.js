const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//env
const dotenv = require('dotenv') 
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação dos comandos

const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection()

for (file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if("data" in command && "execute" in command){
    client.commands.set(command.data.name, command)
    }else{
        console.log(`Esse comando em ${filePath} está ausente`)
    }
}

//Login do bot

client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado com sucesso ${c.user.tag}`);
});

client.on('ready', async () => {
	try {
		console.log('Limpando o cache de comandos...');

		const guild = client.guilds.cache.get(GUILD_ID);
		await guild.commands?.cache.clear(); // Limpa o cache de comandos, se existir.

		console.log('Cache de comandos limpo com sucesso!');
	} catch (error) {
		console.error(error);
	}
});
client.login(TOKEN);

//Listener de interações

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0];
    
        switch(selected) {
            case "javascript":
                await interaction.reply("https://developer.mozilla.org/en-US/docs/Web/JavaScript");
                break;
            case "python":
                await interaction.reply("https://docs.python.org/3/");
                break;
            case "csharp":
                await interaction.reply("https://learn.microsoft.com/en-us/dotnet/csharp/");
                break;
            case "discordjs":
                await interaction.reply("https://discord.js.org/#/");
                break;
            default:
                break;
        }
    }
    
    console.log("InteractionCreate evento acionado!"); //Adicione essa linha

    if(!interaction.isChatInputCommand())
    return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command){
        console.error("Comando não encontrado!")
        return
    }
    try{
        await command.execute(interaction)
    } catch(error)
    {
        console.error(error)
        await interaction.reply("Houve um erro ao tentar executar seu comando")
    }
})
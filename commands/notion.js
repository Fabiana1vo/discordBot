const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("notion")
        .setDescription("Acesse sua página de estudos rapidamente por aqui!"),

    async execute(interaction) {
        await interaction.reply("https://www.notion.so/fabianaivo/Estudos-e-cursos-bacca1ef16014d3598b85d43f7e21610")
    }
}
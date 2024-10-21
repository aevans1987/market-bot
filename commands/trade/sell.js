const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('For people to list what they sell!')
        .addStringOption(option => 
            option.setName('product')
                .setDescription('Product to sell.')
                .setRequired(true)
        )
        .addNumberOption( option => 
            option.setName('price')
                .setDescription('Price to sell items at')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply({content: `Selling ${interaction.options.getString('product')} at ${interaction.options.getNumber('price')}`, ephemeral: true })
    },
};
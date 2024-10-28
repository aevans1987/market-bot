const { SlashCommandBuilder } = require('discord.js');
const { db_query } = require('../../db/query.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('For people to list what they sell!')
        .addStringOption(option => 
            option.setName('product')
                .setDescription('Product to sell.')
                .setRequired(true)
                .setMaxLength(11)
        )
        .addNumberOption( option => 
            option.setName('price')
                .setDescription('Price to sell items at')
                .setRequired(true)
        )
        .addStringOption(option=> 
            option.setName('availability')
            .setDescription('Product Availability')
            .setMaxLength(20)
        ),
    async execute(interaction) {
        console.log('Beginning new Sell order.')
        const query = `INSERT INTO public."${interaction.guild.id}" (seller, product, price, availability) VALUES (${interaction.user.id}, '${interaction.options.getString('product').toUpperCase()}', ${interaction.options.getNumber('price')}, '${interaction.options.getString('availability') ?? 'N/A'}')`;
        const result = await db_query(query, 'create');
        console.log(result)
        await interaction.reply({content: `Selling ${interaction.options.getString('product')} at ${interaction.options.getNumber('price')} with no listed availability ${result}.`, ephemeral: true })
    },
};
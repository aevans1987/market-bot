const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db_query } = require('../../db/query.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('For people to search for a product!')
        .addStringOption(option => 
            option.setName('product')
                .setDescription('Product to buy.')
                .setRequired(true)
                .setMaxLength(11)
        ),
    async execute(interaction) {
        // Build the query to send over
        const query = `SELECT seller, product, price, availability FROM public."${interaction.guild.id}" WHERE product LIKE '${interaction.options.getString('product').toUpperCase()}%';`;
        // Send it over, this is a select query so we are going to specify that. Select will ensure that the respose is appropriate.
        const result = await db_query(query, 'select');

        // Empty Array to build the results
        var array = []
        result.forEach(element => {
            array.push(
                {
                    name: 'Seller',
                    value: `<@${element[0]}>`
                },
                {
                    name: 'Product',
                    value: element[1],
                    inline: true
                },
                {
                    name: 'Price',
                    value: element[2].toString(),
                    inline: true
                },
                {
                    name: 'Availability',
                    value: element[3],
                    inline: true
                }
            )
        });
//        console.log(array)
        // Make a new Embed to display the information. Much cleaner looking then a normal text reply.
        const embed = new EmbedBuilder()
            .setTitle('Orders that match your query.')
            .setDescription(`These orders match the request of product ${interaction.options.getString('product').toUpperCase()}`)
            .setTimestamp(Date.now())
            .setColor('Green')
            .addFields(array);
        await interaction.reply({embeds: [embed]})
        //await interaction.reply({content: `Selling ${interaction.options.getString('product')} at ${interaction.options.getNumber('price')} with no listed availability ${result}.`, ephemeral: true })
    },
};
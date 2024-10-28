const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { db_query } = require('../../db/query.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admindelete')
        .setDescription('For Admin to delete any listings!')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('ID of the product to remove.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 

    async execute(interaction) {
        // Adding some extra overhead on this to ensure we provide proper feedback to the client.
        const select_query = `SELECT order_id, product, price, availability, seller FROM public."${interaction.guild.id}" WHERE order_id = ${interaction.options.getNumber('id')};`
        const select_result = await db_query(select_query, 'select');
        // Delete will require some extra, we need both the ID and the seller, this will ensure that Joe can't delete John's listings.
        const delete_query = `DELETE FROM public."${interaction.guild.id}" WHERE order_id = ${interaction.options.getNumber('id')};`;
        const delete_result = await db_query(delete_query, 'create');
        console.log(delete_result);
        // Empty Array to build the results from the select query
        var array = []
        select_result.forEach(element => {
            array.push(
                {
                    name: 'ID',
                    value: element[0]
                },
                {
                    name: 'Seller',
                    value: `<@${element[4]}>`
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
        var embed = new EmbedBuilder()
            .setTitle('Orders that were deleted.')
            .setDescription(`This order is gone`)
            .setTimestamp(Date.now())
            .setColor('Green')
            .addFields(array);

        await interaction.reply({embeds: [embed]})
        //await interaction.reply({content: `Selling ${interaction.options.getString('product')} at ${interaction.options.getNumber('price')} with no listed availability ${result}.`, ephemeral: true })
    },
};
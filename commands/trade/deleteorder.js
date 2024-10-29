const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db_query } = require('../../db/query.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteorder')
        .setDescription('For people to search for delete own listings!')
        .addNumberOption(option => 
            option.setName('id')
                .setDescription('ID of the product to remove.')
                .setRequired(true)
        ), 
    async execute(interaction) {
        // Adding some extra overhead on this to ensure we provide proper feedback to the client.
        const select_query = `SELECT order_id, product, price, availability, seller FROM public."${interaction.guild.id}" WHERE order_id = ${interaction.options.getNumber('id')};`
        const select_result = await db_query(select_query, 'select');

        if(select_result[0][4] !== interaction.user.id) {
            console.log('Entering unauthorized')
            var embed = new EmbedBuilder()
                .setTitle('Error!')
                .setDescription(`You are not authorized to delete this order`)
                .setTimestamp(Date.now())
                .setColor('Red');
        } else {
            console.log('Entering Authorized')
            // Delete will require some extra, we need both the ID and the seller, this will ensure that Joe can't delete John's listings.
            const delete_query = `DELETE FROM public."${interaction.guild.id}" WHERE order_id = ${interaction.options.getNumber('id')} AND seller = ${interaction.user.id};`;
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
                .setDescription(`These orders are gone`)
                .setTimestamp(Date.now())
                .setColor('Green')
                .addFields(array);
        }

        await interaction.reply({embeds: [embed], ephemeral: true})
        //await interaction.reply({content: `Selling ${interaction.options.getString('product')} at ${interaction.options.getNumber('price')} with no listed availability ${result}.`, ephemeral: true })
    },
};
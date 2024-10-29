const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { db_query } = require('../../db/query.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminorders')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription('For Admin to search for Other users listings!')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Select a user to search for')
                .setRequired(true)
        ),

    async execute(interaction) {
        console.log('Starting Admin Order Command')
        // Build the query to send over
        const query = `SELECT order_id, product, price, availability FROM public."${interaction.guild.id}" WHERE seller = ${interaction.options.getUser('user').id};`;
        // Send it over, this is a select query so we are going to specify that. Select will ensure that the respose is appropriate.
        const result = await db_query(query, 'select');

        // Empty Array to build the results
        var array = []
        result.forEach(element => {
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
        const embed = new EmbedBuilder()
            .setTitle('Orders that match your query.')
            .setDescription(`These orders belong to: ${interaction.options.getUser('user')}`)
            .setTimestamp(Date.now())
            .setColor('Green')
            .addFields(array);
        await interaction.reply({embeds: [embed]}) 
    },
};
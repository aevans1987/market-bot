const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with Bot Command Information!'),
	async execute(interaction) {
        const array = [
            {
                name: "/help",
                value: "Displays this help command!"
            },
            {
                name: "/sell",
                value: "Allows you to list products for sale."
            },
            {
                name: "/buy",
                value: "Allows you to search orders that have been registered for a product."
            },
            {
                name: "/myorders",
                value: "Shows you your registered sell orders."
            },
            {
                name: "/deleteorder",
                value: "Allows you to delete an existing order with the order id."
            },
            {
                name: "/adminorders",
                value: "Allows an Admin to view all orders posted by a user."
            },
            {
                name: "/admindelete",
                value: "Allows an Admin to delete an order posted by a user."
            }
        ];
        const embed = new EmbedBuilder()
            .setTitle('Help Info!.')
            .setDescription(`Command Info`)
            .setTimestamp(Date.now())
            .setColor('Green')
            .addFields(array);
        await interaction.reply({embeds: [embed]})
	},
};
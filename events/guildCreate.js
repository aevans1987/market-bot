const { Events } = require('discord.js');
const { db_query } = require('../db/query.js')

module.exports = {
	name: Events.GuildCreate,
	async execute(guild) {
        const query = `CREATE TABLE public."${guild.id}"() INHERITS (public.template);`
        console.log(`Bot has been added to a new server: ${guild.id}/${guild.name}`)
		const result = db_query(query)
        console.log(`Action ${result}`)
	},
};
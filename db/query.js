const { Client } = require('pg');
const { database_user, database_password, host, port, database_name } = require ('../config.json')

async function db_query(query, type){
    // Make a new client
    const db_client = new Client({
        host: host,
        user: database_user,
        password: database_password,
        port: port,
        database: database_name
    });

    try {
        console.log(`connecting!`)
        await db_client.connect().then(()=> console.log("connected"));
    
        console.log('starting query: ' + query)
        var result = await db_client.query({rowMode: 'array', text: query})
        //console.log(result.rows)
    
        console.log('ending')
        db_client.end();
        console.log(type)
        if(type=='create'){
            return 'Succeeded';
        } else {
            return result.rows;
        }
    } catch (error) {
        console.log(`An Error has occured.`)
        console.log(error)
        return 'Failed'
    };
};

module.exports = { db_query }
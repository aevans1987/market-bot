const { Client } = require('pg');
const { database_user, database_password, host, port, database_name } = require ('../config.json')

console.log(connectionString)
const db_client = new Client({
//    connectionString
    host:host,
    user:database_user,
    password:database_password,
    port: port,
    database:database_name
})
console.log('connecting')
db_client.connect().then(()=> console.log("connected"));
console.log('starting query')
db_client.query('Select * from public.demo_table', (err,res) =>{
    if(!err) {
        console.log(res.rows)
    } else {
        console.log(err.message)
    }
})

console.log('ending')
db_client.end();
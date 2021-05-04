const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');
// const config = require('../config.js');
// const { port, dbUrl, secret } = config;
//console.log(mongoose);

//Conexión a través de mongodb module
// const dbConnection = async (dbUrl) => {
//     const client = new MongoClient(dbUrl, {useUnifiedTopology: true });
//     const dbName= 'burguerQueenBD';
//     return new Promise ((resolve, reject) => {
//         client.connect((err) => {
//             if(err) {
//                 reject(err);
//             }
//             const db = client.db(dbName);
//             //console.log('Conexión con la base de datos exitosa');
//             resolve(db);
//         })
//     })
// };

// module.exports = { dbConnection };


const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
//const mongoose = require('mongoose');
//const { dbConnection } = require('./db-connection/dbConnection.js'); 


const { port, dbUrl, secret } = config;
const app = express();

// TODO: Conexión a la Base de Datos (MongoDB) Se usa TODO: para indicar lo que debe hacer una función previo a la implementación
// dbConnection(dbUrl)
//   .then((db) => {
//     console.log(db);
//     console.log('Conexión con la base de datos exitosa');
//     db.collection('orders').insertOne({ // insertamos un usuario
//       order: 'primer cliente'
//     });
//   }).catch((error) => {
//       console.log(error);
//   })

//   app.set("config", config);
//   app.set("pkg", pkg);

//   // parse application/x-www-form-urlencoded
//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());  //middleware para poder leer el "body" de un objeto JSON entrante.
//   app.use(authMiddleware(secret));

//   routes(app, (err) => {
//     if (err) {
//       throw err;
//     }

//     app.use(errorHandler);
    
//     app.listen(port, () => {
//     console.info(`App listening on port ${port}`);
//     });
//   });

// mongoose.connect(dbUrl, { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   });
    // if(err) {
    //   console.log('ERROR: connecting to Database. ' + err);
    // }

app.set("config", config);
app.set("pkg", pkg);

  // parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  //middleware para poder leer el "body" de un objeto JSON entrante.
app.use(authMiddleware(secret));

routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
  console.info(`App listening on port ${port}`);
  });
});

// const db = mongoose.connection;
// console.log(db);
// db.close();
// console.log(db);
//   db.on('error', console.error.bind(console, 'Connection error:')); // enlaza el track de error a la consola (proceso actual)
//   db.once('open', () => {
//     console.log('MongoDB is connected'); // si esta todo ok, imprime esto
//   }); 
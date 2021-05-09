const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { corsOptions } = require('./corsOptions.js');

const { port, dbUrl, secret } = config;
const app = express();
// Conexión a la Base de Datos
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', console.warn.bind(console, 'MongoDB is connected'));

app.set('config', config);
app.set('pkg', pkg);
app.use(cors(corsOptions));

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

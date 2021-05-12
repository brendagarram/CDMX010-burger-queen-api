const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel.js');
const config = require('../config.js');
const { isAdmin } = require('../middleware/auth');

const { secret } = config;

module.exports = {
  createToken: async (req, resp, next) => {
    const { email, password } = req.body;
    const userEmail = req.body.email;
    const emailQuery = { email: userEmail };
    try {
      if (!password || !email || (!email && !password)) {
        next(400);
      } else {
        await users.findOne(emailQuery, (error, res) => {
          if (!res) {
            next(403);
          } else {
            bcrypt.compare(password, res.password, (err, result) => {
              if (!result) {
                next(401);
              } else {
                const token = jwt.sign(
                  { uid: res._id },
                  secret,
                  { expiresIn: '24h' },
                );
                resp.json({
                  user: res,
                  auth: true,
                  token,
                });
              }
            });
          }
        });
      }
    } catch (err) {
      if (err) {
        return next(501);
      }
    }
  },
  getUsers: async (req, resp) => {
    //  http://localhost:8080/users?page=2&limit=5
    const limitPage = parseInt(req.query.limit, 10) || 10;
    // se coloca ,10 como argumento de parseInt para indicar la base
    const page = parseInt(req.query.page, 10) || 1;
    const startIndex = (page - 1) * limitPage; // Rango en el que se irán mostrando los documentos
    const endIndex = page * limitPage;
    const totalDocs = await users.countDocuments().exec();
    const results = {};
    const url = `${req.protocol}://${req.get('host')}${req.path}`;
    if (endIndex < totalDocs) {
      results.next = {
        page: page + 1,
        limit: limitPage,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limitPage,
      };
    }
    const firstPage = `limit=${limitPage}&page=${page > 1 ? 1 : page}`;
    const lastPage = `limit=${limitPage}&page=${Math.ceil(totalDocs / limitPage)}`;
    const nextPage = `limit=${limitPage}&page=${endIndex < totalDocs ? page + 1 : Math.ceil(totalDocs / limitPage)}`;
    const prevPage = `limit=${limitPage}&page=${page > 1 ? page - 1 : 1}`;
    resp.set('link', `<${url}?${firstPage}>; rel="first",<${url}?${prevPage}>; rel="prev",<${url}?${nextPage}>; rel="next",<${url}?${lastPage}>; rel="last"`);
    results.result = await users.find().skip(startIndex).limit(limitPage).exec();
    resp.json(results);
  },

  getUserUid: async (req, resp, next) => {
    let userObj = {};
    const uid = req.params.uid.slice(req.params.uid.indexOf('=') + 1);
    if (uid.indexOf('@') < 0) {
      userObj = { _id: uid };
    } else {
      userObj = { email: uid };
    }
    const userFounded = await users.findOne(userObj);
    //  console.log(userFounded);
    if (!userFounded) {
      return next(404);
    }
    if (!isAdmin(req) && !(req.userAuth.id === uid || req.userAuth.email === uid)) { // Sólo se enviará la información si el usuario es admin, o el usuario actual
      return next(403);
    }
    return resp.status(200).send({
      roles: userFounded.roles,
      _id: userFounded._id.toString(),
      email: userFounded.email,
    });
  },
};

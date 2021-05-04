const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel.js');
const config = require('../config.js');

const { secret } = config;

module.exports = {
  createToken: async (req, resp, next) => {
    const { email, password } = req.body;
    const userEmail = req.body.email;
    console.log(userEmail);
    const emailQuery = { email: userEmail };
    try {
      if (!password || !email || (!email && !password)) {
        return next(400);
      }
      await users.findOne(emailQuery, (error, res) => {
        if (!res) {
          return next(403);
        }
        bcrypt.compare(password, res.password, (err, result) => {
          if (!result) {
            return next(401);
          }
          const token = jwt.sign(
            { res },
            secret,
            { expiresIn: '24h' /*  24 horas */ },
          );
          console.log(token);
          resp.json({
            token,
          });
          next();
        });
      });
    } catch (err) {
      if (err) {
        return next(501);
      }
    }
  },
  getUsers: async (req, resp) => {
    //console.log('entro');
    const limitPage = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const result = await users.find().skip((page - 1) * limitPage).limit(limitPage).exec();
    return resp.send(result);
  },
};

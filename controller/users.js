const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel.js');
//  const error = require('../middleware/error.js');
const config = require('../config.js');

const { secret } = config;

module.exports = {
  createToken: async (req, resp, next) => {
    const { email, password } = req.body;
    const userEmail = req.body.email;
    const emailQuery = { email: userEmail };
    try {
      if (!password || !email || (!email && !password)) {
        return next(400);
      }
      await user.findOne(emailQuery, (error, res) => {
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
            { expiresIn: 300000 /*  5 min */ },
          );
          resp.json({
            token,
          });
        });
      });
    } catch (err) {
      if (err) {
        return next(501);
      }
    }
  },
};

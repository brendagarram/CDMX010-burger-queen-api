const jwt = require('jsonwebtoken');
const users = require('../models/userModel.js');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) { next(403); }
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    users.findOne({ _id: decodedToken.uid }, (err, user) => {
      if (err) { next(500, err); }
      req.headers.user = user;
      next();
    });
  });
};

module.exports.isAuthenticated = (req) => (
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  req.headers.user ? true : false
);

module.exports.isAdmin = (req) => (
  // TODO: decidir por la informacion del request si la usuaria es admin
  req.headers.user && req.headers.user.roles.admin
);

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);

// module.exports.requireAdminOrUser = (req, resp, next) => {
//   (!module.exports.isAuthenticated(req)) ?
//   next(401): (!module.exports.isAdmin(req) && !(req.headers.user._id.toString() === req.params.uid || req.headers.user.email === req.params.uid)) ?
//       next(403) :
//       next()
// };

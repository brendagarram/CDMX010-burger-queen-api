module.exports = {
  getUsers: (req, resp, next) => {
  },

  // postUser: async (req, res, next) => {
  //   const { email, password } = req.body;
  //   if (!password) return next(400);
  //   if ( !password || !email || (!email && !password) || password.length <= 6 ) { //Agregar la validación de email con expresiones regulares
  //     return next(400);
  //   }
  //   const invalidUser = await users.findOne({ email: req.body.email });
  //   if (invalidUser) return next(403);
  //   let newUser = new user(); //se crea la nueva instancia con el modelo user
  //   newUser.email = email;
  //   newUser.password = bcrypt.hashSync(password, 10);
  //   if (req.body._id) {
  //       newUser._id = req.body._id;
  //   }
  //   // if (req.body.roles && req.body.roles.admin) {
  //   //     newUser.roles = { admin: true }
  //   // }
  //   const userSaved = await newUser.save();
  //   return resp.send(newUser);
    // ({
    //     // roles: userStored.roles,
    //     // _id: userStored._id.toString(),
    //     email: userSaved.email
    //});
  //   const user = {
  //     email,
  //     password,
  //   };
  // },
};

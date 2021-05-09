const Product = require('../models/productModel.js');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

module.exports = {
  postProduct: async (req, resp, next) => {
    const {
      name,
      price,
      image,
      type,
    } = req.body;
    try {
      if (!name || !price) {
        next(400);
      }
      if (!isAuthenticated) {
        next(401);
      }
      if (isAdmin) {
        const newProduct = new Product({
          name,
          price,
          image,
          type,
        });
        const productSaved = await newProduct.save();
        resp.status(200).send(productSaved);
      } else {
        next(403);
      }
    } catch (err) {
      return next(404);
    }
  },
};

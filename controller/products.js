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
          dateEntry: Date.now(),
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

  getProducts: async (req, resp) => {
    //  http://localhost:8080/produts?page=2&limit=5
    const limitPage = parseInt(req.query.limit, 10) || 10;
    // se coloca ,10 como argumento de parseInt para indicar la base
    const page = parseInt(req.query.page, 10) || 1;
    const startIndex = (page - 1) * limitPage; // Rango en el que se irán mostrando los documentos
    const endIndex = page * limitPage;
    const totalDocs = await Product.countDocuments().exec();
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
    results.result = await Product.find().skip(startIndex).limit(limitPage).exec();
    resp.json(results);
  },
};

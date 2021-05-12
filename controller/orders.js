const Order = require('../models/orderModel.js');
const Product = require('../models/productModel.js');

module.exports = {
  postOrder: async (req, resp, next) => {
    const { 
      userId,
      client, 
      products 
    } = req.body;

    if (!userId || !products || products.length === 0) {
      return next(400);
    }

    let newOrder = new Order({
      userId,
      client,
      dateEntry: Date.now(),
    });
    
    const arrayProducts = products.map(async (product) => {
      const { _id } = product;
      const foundedProduct = await Product.find({ _id: _id });
      return foundedProduct;
    });
    Promise.all(arrayProducts).then(async (result) => {
      const productsBD = result.reduce((acc, product) => acc.concat(product), []);
      const productQty = products.map((product => product.qty));
      const allProducts = productsBD.map((product, index) => ({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price
        },
        qty: productQty[index],
      }))
      newOrder.products = allProducts;
      const orderStored = await newOrder.save();
      return resp.send(orderStored);
    })
  }
}
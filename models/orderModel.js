const mongoose = require('mongoose');

const productsCollection = new mongoose.Schema({
  product: Object,
  qty: Number,
})

const orderSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true,
  },
  client: {
      type: String,
  },
  products: [productsCollection],
  status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'canceled', 'delivering', 'delivered'],
  },
  dateEntry: {
      type: Date,
      required: true
  },
  dateProcessed: {
    default: '',
    type: Date, //  Fecha de cambio de status a `delivered`
  }  
});

module.exports = mongoose.model('Orders', orderSchema);
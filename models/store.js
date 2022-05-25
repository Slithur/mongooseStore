const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String },
  price: [Number],
  qty: [Number]
  //   completed: Boolean
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
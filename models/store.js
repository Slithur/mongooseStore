const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
	Name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
	completed: Boolean,
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
const mongoose = require('mongoose');

/**
 * @constructor Place
 */
const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Place', placeSchema);

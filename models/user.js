const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true, minLength: 6 },
  image: { type: String, require: true },
  places: [{ type: mongoose.ObjectId, require: true, ref: 'Place' }],
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User'
  },
  domaine: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Domaine'
  },
  createdAt: { type: Date, default: Date.now },
  description: String,
  age: Number,
  alcohol: Number
}); 

module.exports = mongoose.model('Wine', wineSchema);

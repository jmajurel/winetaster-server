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
  description: String,
  owners: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  domaine: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Domaine'
  },
  createdAt: { type: Date, default: Date.now },
  age: Number,
  alcohol: Number
}); 

module.exports = mongoose.model('Wine', wineSchema);

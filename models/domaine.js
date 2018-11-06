const mongoose = require('mongoose');

const domaineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },  
  createdAt: { type: Date, default: Date.now },
  picture: String,
  wines: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Wine'
  }],
  address: String,
  lat: Number,
  lng: Number,
  description: String
});

module.exports = mongoose.model('Domaine', domaineSchema);

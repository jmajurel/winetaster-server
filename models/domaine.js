const mongoose = require('mongoose');

const domaineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  picture: String,
  wines: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Wine'
  }],
  address: String 
});

module.exports = mongoose.model('Domaine', domaineSchema);

const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/winetaster', { useNewUrlParser: true });

module.exports.Domaine = require('./domaine');
module.exports.Wine = require('./wine');
module.exports.User = require('./user');

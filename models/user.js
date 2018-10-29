const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
  },
  wines: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Wine'
  }]
});

userSchema.pre('save', async function(next) {
  try {
    //skip when the profile is updated
    if(!this.isModified('password')){
      return next();
    } else {
      let hashedPassword = await bcrypt.hash(this.password, 10); 
      this.password = hashedPassword;
      return next();
    }
  } catch(err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);

const jwt = require('jsonwebtoken');
const db = require('../models');

async function signup(req, res, next) {
  try {
    const newUser = await db.User.create(req.body);
    const { id, username, email, profileImageUrl } = newUser;
    const token = jwt.sign({
      id,
      username,
      email,
      profileImageUrl
    }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      email,
      profileImageUrl,
      token
    });
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'Sorry this username and/or email is already taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({email});
    const { id, username, profileImageUrl } = user;
    const goodPwd = await user.comparePassword(password);
    if(goodPwd) {
      const token = jwt.sign({
        id,
       	username,
       	profileImageUrl 
      }, process.env.SECRET_KEY);
      return res.status(200).json({
	id,
	username,
	profileImageUrl,
	token
      });
    } else {
      return next({
	status: 400,
	message: 'Invalid Username/password'
      });
    }
  } catch(err) {
    return next({
	status: 400,
	message: 'Invalid Username/password'
    });
  }
}

module.exports = { login, signup };

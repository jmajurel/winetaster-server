const mongoose = require('mongoose');

function createDomaine(req, res, next) {
  try {
    const {name} = req.body;

  } catch(err) {
    next(err);
  }
}


module.exports = { createDomaine };

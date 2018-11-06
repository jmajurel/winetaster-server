const db = require('../models');
const sanitizer = require('sanitizer');
const nodeGeocoder = require('node-geocoder');

const geocoder = nodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEO_KEY
});

async function getAllDomaines(req, res, next) {
  try {
    const domaines = await db.Domaine.find()
                             .populate('wines');
    return res.status(200).json(domaines);
  } catch(err) {
    return next(err);
  }
}

async function getOneDomaine(req, res, next) {
  try {
    const domaine = await db.Domaine.findById(req.params.id)
                            .populate('wines');
    return res.status(200).json(domaine);
  } catch(err) {
    return next(err);
  }
}

async function deleteDomaine(req, res, next) {
  try {
    await db.Domaine.findByIdAndRemove(req.params.id);
    return res.status(200);
  } catch(err) {
    return next(err);
  }
}

async function updateDomaine(req, res, next) {
  try {
    const { name, picture, address, description } = req.body;

    let updatedDomaine = {
      name,
      picture,
      address,
      description: sanitizer.sanitize(description)
    };

    await geocoder.geocode(address)
	    .then(res => {
	      console.log(res);
	      if(res) {
		updatedDomaine.address = res[0].formattedAddress;
		updatedDomaine.lat = res[0].latitude;
		updatedDomaine.lng = res[0].longitude;
	      }
	    });

    const newlyUpdatedDomaine = await db.Domaine.findByIdAndUpdate(req.params.id, updatedDomaine)
					.populate('wines');

    return res.status(201).json(newlyUpdatedDomaine);
  } catch(err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

module.exports = { getAllDomaines, getOneDomaine, deleteDomaine, updateDomaine };

const db = require('../models');

async function getAllWines(req, res, next) {
  try {
    const wines = await db.Wine.find();
    return res.status(200).json(wines);
  } catch(err) {
    return next(err);
  }
};

async function getOneWine(req, res, next) {
  try {
    const wine = await db.Wine.findById(req.params.id)
      .populate('owners')
      .populate('domaine');
    return res.status(200).json(wine);
  } catch(err) {
    return next(err);
  }
}

async function createWine(req, res, next) {
/* the wine already exist => do not save it and return message */
/* the wine doesn't exist => store wine, */
  try {
    const { name, type, price, image, description, age, alcohol, domaine } = req.body;
    const userId = req.params.id;
    const foundWine = await db.Wine.findOne({ name });
    const foundUser = await db.User.findById(userId);
    const foundDomaine = await db.Domaine.findOne({ name: domaine });

    if(foundWine) {
      //wine is already exisiting in bd
      return next({
	status: 400,
	message: 'This wine already exists'
      });

    } else {

      const domaineRef = foundDomaine ? 
	foundDomaine : 
	(await db.Domaine.create({name: domaine}));
      
      const newlyCreatedWine = await db.Wine.create({
	name,
	type,
	price: Number(price[0]),
	image,
	age,
	alcohol,
	description,
	domaine: domaineRef.id
      });

      console.log(newlyCreatedWine);
      
      newlyCreatedWine.owners.push(foundUser.id);
      await newlyCreatedWine.save();

      foundUser.wines.push(newlyCreatedWine._id);
      await foundUser.save();

      domaineRef.wines.push(newlyCreatedWine._id);
      await domaineRef.save();

      const newWine = await db.Wine.findById(newlyCreatedWine._id)
	.populate('owners')
	.populate('domaine');

      return res.status(200).json(newWine);

    }
  } catch(err) {
    return next({
      status: 400, 
      message: err.message
    });
  } 
};

async function deleteWine(req, res, next){
  try {
    await db.Wine.findByIdAndRemove(req.params.wineId);
    return res.status(200).json({});

  } catch(err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

async function updateWine(req, res, next) {
  try {

    const { name, type, age, price, domaine, image, description } = req.body;

    let domaineRef = await db.Domaine.findOne({ name: domaine });
    if(!domaineRef) {
      domaineRef = await db.Domaine.create({ name: domaine });
    }

    const updatedWine = {
      name,
      type,
      age,
      price,
      domaine: domaineRef._id,
      image,
      description
    };

    const newlyUpdatedWine = await db.Wine.findByIdAndUpdate(req.params.wineId, updatedWine)
	                             .populate('owners')
                                     .populate('domaine');

    return res.status(201).json(newlyUpdatedWine);

  } catch(err) {
    return next({
      status: 400,
      message: err.message
    });
  }
}

module.exports = { getAllWines, getOneWine, createWine, deleteWine, updateWine };

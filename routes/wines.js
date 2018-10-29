const express = require('express');
const { getAllWines, getOneWine, createWine, deleteWine, updateWine } = require('../handlers/wines');
const { loginRequired, ensureCorrectUser } = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.get('/:id', getOneWine); 
router.post('/', loginRequired, createWine);
router.delete('/:wineId', loginRequired, ensureCorrectUser, deleteWine);
router.put('/:wineId', loginRequired, ensureCorrectUser, updateWine);

module.exports = router;

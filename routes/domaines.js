const express = require('express');
const { getAllDomaines, getOneDomaine, deleteDomaine, updateDomaine } = require('../handlers/domaines');

const router = express.Router();

router.get('/', getAllDomaines); 
router.get('/:id', getOneDomaine); 
router.delete('/:id', deleteDomaine);
router.put('/:id', updateDomaine);

module.exports = router;

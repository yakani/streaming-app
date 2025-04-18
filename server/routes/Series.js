const express = require('express');
const {protect}= require('../auth/Protect.js');
const { addSeries, getOneserie, getSeries, deleteSeries, updateSerie, getOneserieByname } = require('../controllers/Series');
const router = express.Router();
router.post('/',protect, addSeries);
router.get('/:id',getOneserie);
router.get('/', getSeries);
router.get('/name/:id', getOneserieByname);
router.delete('/',protect, deleteSeries);
router.put('/:id',protect, updateSerie);
module.exports = router;
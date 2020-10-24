const router = require('express').Router();
const pool = require('../models/database');
const MangasController = require('../controllers/mangas');
router.get('/', MangasController.getAll);
router.get('/:id', MangasController.getOne);
module.exports = router;
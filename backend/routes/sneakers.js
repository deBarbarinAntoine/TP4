const express = require('express');
const router = express.Router();
const controllers = require('../controllers/sneaker');

// Setting the routes for the sneakers API
router.get('/sneakers', controllers.getSneakers);
router.get('/sneaker/:id', controllers.getSneakerById);

module.exports = router;
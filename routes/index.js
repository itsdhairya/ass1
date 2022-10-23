var express = require('express');
var router = express.Router();
let controllerIndex = require('../controllers/index');

// Routes
router.get('/', controllerIndex.home);
router.get('/about-me', controllerIndex.aboutme);
router.get('/projects', controllerIndex.projects);
router.get('/services', controllerIndex.services);
router.get('/contact-me', controllerIndex.contactme);

module.exports = router;

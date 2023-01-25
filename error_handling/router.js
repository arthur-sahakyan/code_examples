const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

router.post('/api/signup', controller.signup);
router.post('/api/login', controller.login);

module.exports = router;


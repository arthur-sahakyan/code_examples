const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

router.post('/api/log', controller.logErrorFunction);
router.post('/api/send', controller.sendErrorFunction);
router.post('/api/other', controller.otherErrorFunction);

module.exports = router;


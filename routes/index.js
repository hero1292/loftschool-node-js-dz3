const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');
router.get('/', homeController.Index);
router.post('/', homeController.SendEmail);

module.exports = router;
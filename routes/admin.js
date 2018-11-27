const express = require('express');
const router = express.Router();

const upload = require('../utils/upload');

const adminController = require('../controllers/admin');
router.get('/', adminController.Admin);

router.post('/skills', adminController.AddSkills);
router.post('/upload', upload.single('photo'), adminController.AddProduct);

module.exports = router;
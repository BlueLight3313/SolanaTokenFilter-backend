const express = require('express');
const router = express.Router();
const { 
    loadSettings, 
    updateSettings, 
} = require('../controllers/setting');

router.get('/load', loadSettings)
router.post('/update', updateSettings);

module.exports = router;
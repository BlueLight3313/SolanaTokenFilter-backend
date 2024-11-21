const express = require('express');
const router = express.Router();
const { 
    getTransactions, 
} = require('../controllers/transaction');

router.post('/get', getTransactions);

module.exports = router;
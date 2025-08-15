const express = require('express');
const router = express.Router();
const { getAllLogs } = require('../controllers/InventoryLogController');

router.get('/', getAllLogs);

module.exports = router;

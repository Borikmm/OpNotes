const express = require('express');
const router = express.Router();
const { createElement, getElements } = require('../controllers/elementController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createElement);
router.get('/:boardId', auth, getElements);

module.exports = router;


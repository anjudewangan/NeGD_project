const { getDepartments } = require('../controllers/department');
const asyncHandler = require('../middleware/asyncHandler');

const router = require('express').Router();

router.get('/', asyncHandler(getDepartments));

module.exports = router;
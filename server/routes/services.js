const router = require('express').Router()
const { services } = require('../controllers/services')
const asyncHandler = require("../middleware/asyncHandler")

router.get('/', asyncHandler(services))

module.exports = router
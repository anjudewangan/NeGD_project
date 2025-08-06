const { sendOTP, verifyOTP } = require('../controllers/otp')
const asyncHandler = require('../middleware/asyncHandler')

const router = require('express').Router()

router.post("/send-otp", asyncHandler(sendOTP))
router.post("/verify-otp", asyncHandler(verifyOTP))

module.exports = router
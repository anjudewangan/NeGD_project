const { customerDetails, newTicket } = require("../controllers/customer");
const asyncHandler = require("../middleware/asyncHandler");
const customerAuth = require("../middleware/customerAuth");

const router = require("express").Router();

router.get("/details", asyncHandler(customerDetails));
router.post("/new-ticket", customerAuth, asyncHandler(newTicket));

module.exports = router;

const {
  fetchActiveCallForAgent,
  dialOutbound,
  activeCalls,
  dialOutboundTicketId,
  liveCalls,
} = require("../controllers/telephonyApi");
const asyncHandler = require("../middleware/asyncHandler");
const checkAgentRole = require("../middleware/checkRole");

const router = require("express").Router();

router.get("/onCall", asyncHandler(fetchActiveCallForAgent));
router.post("/dialOutbound", asyncHandler(dialOutbound));
router.get("/activeCalls", asyncHandler(activeCalls));
router.post("/dial-ticket-id", asyncHandler(dialOutboundTicketId));
router.get('/live-calls', checkAgentRole(['admin']), asyncHandler(liveCalls))
module.exports = router;

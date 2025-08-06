const router = require('express').Router()
const { agentsUnder, me } = require('../controllers/agents')
const asyncHandler = require('../middleware/asyncHandler')
const checkAgentRole = require('../middleware/checkRole')

router.get("/agents-under", checkAgentRole(["manager", "admin"]), asyncHandler(agentsUnder))
router.get("/me", asyncHandler(me))

module.exports = router
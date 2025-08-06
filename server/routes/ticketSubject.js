const {
  getTicketSubjects,
  getFullSubjectPath,
} = require("../controllers/ticketSubjects");
const asyncHandler = require("../middleware/asyncHandler");

const router = require("express").Router();

router.get("/", asyncHandler(getTicketSubjects));
router.get("/fullPath/:subjectId", asyncHandler(getFullSubjectPath));

module.exports = router;

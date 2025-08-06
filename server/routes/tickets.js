const router = require('express').Router();
const multer = require("multer");
const path = require("path");

const {
  createNewTicket,
  updateTicket,
  getPendingTickets,
  getTicket,
  sendMessageForTicket,
  assignTicket,
  getAllTickets,
  getMessages,
  ticketInfo
} = require("../controllers/tickets");
const asyncHandler = require("../middleware/asyncHandler");
const checkAgentRole = require('../middleware/checkRole');

const uploadDir = path.join(__dirname, "..", "attachments");
console.log("Upload Directory: ", uploadDir);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the upload directory defined in expressApp
  },
  filename: (req, file, cb) => {
    // Avoid name collisions
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.array("attachment", 5),
  asyncHandler(createNewTicket)
);

router.put("/update/:ticketId", asyncHandler(updateTicket));
router.get("/pending-tickets", asyncHandler(getPendingTickets));
router.get("/all", checkAgentRole(['manager', 'admin']), asyncHandler(getAllTickets))
router.get("/", asyncHandler(getTicket));
router.get("/messages/:ticketId", asyncHandler(getMessages))
router.get('/info/:ticketId', asyncHandler(ticketInfo))

router.post("/send-message", upload.array("attachment", 5), asyncHandler(sendMessageForTicket))
router.post("/assign-ticket", checkAgentRole(['manager', "admin"]), asyncHandler(assignTicket))

module.exports = router;
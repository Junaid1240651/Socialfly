const express = require("express");
const protectRoute = require("../middleware/proctectRoute.js");
const {
  getMessages,
  sendMessage,
  getConversations,
} = require("../controllers/messageController.js");

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage);

module.exports = router;

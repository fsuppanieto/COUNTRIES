const express = require("express");
const router = express.Router();
const activityControllers = require("../controllers/activityControllers");

router.post("/", activityControllers.createActivity);
router.get("/", activityControllers.getAllActivities);

module.exports = router;

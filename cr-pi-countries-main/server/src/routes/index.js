const { Router } = require("express");
const router = Router();
const countriesRouter = require("./countries");
const activitiesRouter = require("./activities");

router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);

module.exports = router;

const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// /api/thought
router.use("/thought", thoughtRoutes);
// /api/user
router.use("/user", userRoutes);

module.exports = router;

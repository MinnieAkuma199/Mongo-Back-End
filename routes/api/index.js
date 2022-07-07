const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// /api/thoughts
router.use("/thoughts", thoughtRoutes);
// /api/user
// router.use("/users", userRoutes);

module.exports = router;

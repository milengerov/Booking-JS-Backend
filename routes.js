const router = require("express").Router();
const isAuth = require("./middlewares/isAuth");

const homeController = require("./controllers/homeController");
const authController = require("./controllers/authController");
const hotelController = require("./controllers/hotelController");


router.use("/", homeController);
router.use("/auth", authController);
router.use("/hotel", isAuth, hotelController);




module.exports = router;
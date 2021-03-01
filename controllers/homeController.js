const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();
const hotelService = require("../services/hotelServise")



router.get("/", (req, res, next) => {
    hotelService.getAll()
        .then(hotels => {

            res.render("home/index", {hotels});
        })
        .catch(next)


})




module.exports = router;
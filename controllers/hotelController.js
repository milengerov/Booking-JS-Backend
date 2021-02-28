const router = require("express").Router();
const hotelService = require("../services/hotelServise")


router.get("/create", (req, res, next) => {
    res.render("hotel/create");
});

router.post("/create", (req, res, next) => {
    const { name, city, imageUrl, freeRooms } = req.body;

    const hotelData = {name, city, imageUrl, freeRooms};
    const userId = req.user._id
    console.log(req.body);
    console.log(hotelData);

    hotelService.create(hotelData, userId)
        .then(hotel => {
            res.redirect("/")
        })
        .catch(err => {
            next(err);
        });

})


module.exports = router;
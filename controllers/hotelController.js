const router = require("express").Router();
const hotelService = require("../services/hotelServise")



router.get("/create", (req, res, next) => {
    res.render("hotel/create");
});


router.post("/create", (req, res, next) => {
    const { name, city, imageUrl, freeRooms } = req.body;

    const hotelData = { name, city, imageUrl, freeRooms };
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

});


router.get("/details/:id", (req, res, next) => {
    const hotelId = req.params.id;
    const userId = req.user._id;

    hotelService.getOne(hotelId, userId)
        .then(hotel => {
            
            res.render("hotel/details", {hotel})
        })
        .catch(next);
});


router.get("/book/:id", (req, res, next) => {
    const hotelId = req.params.id;
    const userId = req.user._id;

    console.log(hotelId, userId);

    hotelService.bookHotel(hotelId, userId)
    .then(() => {
        
        res.redirect(`/hotel/details/${hotelId}`)
    })
    .catch(next);
});


module.exports = router;
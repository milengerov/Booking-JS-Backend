const Hotel = require("../models/Hotel");

function create(hotelData, userId) {
    const hotel = new Hotel ({...hotelData, creator: userId});
    return hotel.save();
}


module.exports = {
    create,
}
const Hotel = require("../models/Hotel");

function create(hotelData, userId) {
    const hotel = new Hotel ({...hotelData, creator: userId});
    return hotel.save();
}


function getAll(){
    return Hotel
    .find({})
    .sort({freeRooms: -1})
    .lean();
}

module.exports = {
    create,
    getAll
}
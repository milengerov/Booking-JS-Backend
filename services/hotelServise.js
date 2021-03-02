const Hotel = require("../models/Hotel");
const User = require("../models/User")



function create(hotelData, userId) {
    const hotel = new Hotel({ ...hotelData, creator: userId });
    return hotel.save();
}


function getAll() {
    return Hotel
        .find({})
        .sort({ freeRooms: -1 })
        .lean();
}


async function getOne(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId).lean();
    hotel.isOwn = hotel.creator == userId;

    const user = await User.findById(userId).lean();
    hotel.isBooked = user.reservations.includes(hotel._id);

    return Promise.all([hotel, user])
        .then(() => {

            hotel.isOwn = hotel.creator == userId;
            hotel.isBooked = user.reservations.some(x => x == hotel._id.toString());
            console.log(hotel);
            return hotel

        })




}

async function bookHotel(hotelId, userId) {
    const user = await User.findById(userId).lean();
    const hotel = await Hotel.findById(hotelId).lean();

    hotel.freeRooms -= 1;
    user.reservations.push(hotel._id);

    await Hotel.replaceOne({ _id: hotel._id }, hotel);
    await User.replaceOne({ _id: user._id }, user)

}


function editHotel(hotelId, hotelData) {
    return Hotel.findByIdAndUpdate(hotelId, hotelData)
        .then(hotel => {
            return hotel;
        })
}

function deleteHotel(hotelId) {
    return Hotel.findByIdAndDelete(hotelId)
    .then(hotel => {return hotel})
}





module.exports = {
    create,
    getAll,
    getOne,
    bookHotel,
    editHotel,
    deleteHotel,
}
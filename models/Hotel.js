const mongoose = require("mongoose");



const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    city: {
        type: String,
        required: true,
        minlength: 3,    
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^(https?)/, "Please, enter a valid URL!"]
    },
    freeRooms: {
        type: Number,
        min: [1, "Free rooms must be at least 1"],
        max: [100, "Free rooms can't be more than 100!"]
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

});



module.exports = mongoose.model("Hotel", hotelSchema);
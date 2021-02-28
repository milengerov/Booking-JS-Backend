const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SECRET, SALT_ROUNDS } = require("../config/config");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please, enter a valid email with english letters and digits only!"]
    },
    password: {
        type: String,
        required: true,
        minlength: 5,    
    },
    reservations: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Hotel"
        }
    ]

});

userSchema.pre("save", function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            console.log(hash);
            next();
        })
        .catch(err => console.log(err));

})

module.exports = mongoose.model("User", userSchema);
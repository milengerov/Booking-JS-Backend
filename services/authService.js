const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {SECRET} = require("../config/config");



const register = (email, username, password, imageUrl) => {

    let user = new User({email,  username, password, imageUrl });

    return user.save();

};


const login = async (username, password) => {

    let user = await User.findOne({ username: username })

    if (!user) {
        return Promise.reject({ message: "No such user!", status: 404 });
        // throw {message: "No such user!", status: 404};
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
        return Promise.reject({ message: "Wrong password!", status: 404 })
    }


    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)
    return token;

};

// function updateUser(id, data) {
//     User.findByIdAndUpdate(id,)
// }


module.exports = {
    register,
    login,
    // updateUser
}
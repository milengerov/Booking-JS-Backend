const {SECRET} = require("../config/config");
const jwt = require("jsonwebtoken");
const {COOKIE_NAME} = require("../config/config");





//check if there a cookie
//validate the token

function auth(req, res, next) {

    let token = req.cookies[COOKIE_NAME];

    if (token) {
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                res.clearCookie(COOKIE_NAME);
            }
            else {
                req.user = decoded;
                res.locals.user = decoded;
                res.locals.isAuth = true;

            }
        });
    }

    next();

}

module.exports = auth;
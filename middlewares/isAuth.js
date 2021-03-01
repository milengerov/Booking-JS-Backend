// const { SECRET } = require("../config/config");
// const jwt = require("jsonwebtoken");
// const { COOKIE_NAME } = require("../config/config");


function isAuth(req, res, next) {
    if (!req.user) {
        res.redirect("/auth/login");
        return
    }

    next()
}


/*function isAuth(req, res, next){
    let token = req.cookies[COOKIE_NAME];

    if (!token) {
        res.redirect("/auth/login");
        return
    }

    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) {
            res.redirect("/auth/login");
            return
        }
        next(); 
    });


}*/

module.exports = isAuth;
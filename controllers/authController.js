const router = require("express").Router();
// const { body, validationResult } = require("express-validator");

const authService = require("../services/authService");
const { COOKIE_NAME } = require("../config/config");

//register
router.get("/register", (req, res) => {
    res.render("auth/register");
});

router.post("/register",
    async (req, res, next) => {

        const { email, username, password, repeatPassword, imageUrl } = req.body;

        if (password != repeatPassword) {
            
            res.render("auth/register", { error: { message: "Passwords missmatch" } });
            return
        }

        try {
            const user = await authService.register(email, username, password, imageUrl);           
            
            res.redirect("/auth/login");

        } catch (error) {
            next(error)
        }

    });





//login
router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    
    authService.login(username, password)
        .then((token) => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true })
            res.redirect("/");
        })
        .catch(err => next(err));

});


//logout
router.get("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect("/");
})






module.exports = router;
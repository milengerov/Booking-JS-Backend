const errorHandler = (err, req, res, next) => {    

    err.message = err.message || "some error message!";
    err.status = err.status || 500;
    console.log(err);
    console.log("===========================================");
    


    //TODO: Add page to render!
    res.status(err.status).render("home/index", {error: err})

};


module.exports = errorHandler;
const messageHandler = (message, req, res, next) => {    

    
    
    


    //TODO: Add page to render!
    res.render("home/index", {info: message})

};


module.exports = messageHandler;
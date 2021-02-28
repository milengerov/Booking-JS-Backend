const express = require("express");

const {PORT} = require("./config/config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const messageHandler = require("./middlewares/messageHandler");


const app = express();

require("./config/mongoose");
require("./config/express")(app);

app.use(routes);
app.use(errorHandler);  //must stay after routes.




app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});



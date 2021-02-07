import config from "../config/config";
import app from "./express";
import mongoose from "mongoose";
import template from "./../template";

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database ${config.mongoUri}`);
})


app.get('/', (req, res) => {
    res.status(200).send(template())
});


//Start server
app.listen(config.port, function(err) {
    if(err) {
        console.log(err);
    }

    console.info('Server started on port %s.', config.port);
})

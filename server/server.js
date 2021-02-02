import express from 'express';
import { MongoClient } from 'mongodb';
import devBundle from "./devBundle"; //COMMENT BEFORE BUILDING
import path from 'path';
import template from "./../template";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernboilerplate';
MongoClient.connect(url, (err, db) => {
    console.log("Connected Successfully to mongodb server")
    db.close();
})

devBundle.compile(app); //COMMENT BEFORE BUILDING

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
    res.status(200).send(template())
});

let port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if(err) {
        console.log(err);
    }

    console.info('Server started on port %s.', port);
})

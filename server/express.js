import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from "path";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import template from "../template";

// modules for server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MainRouter from './../client/MainRouter';
import { StaticRouter } from 'react-router-dom';

import devBundle from "./devBundle"; //COMMENT BEFORE BUILDING

const CURRENT_WORKING_DIR = process.cwd();

//Express App
const app = express();

devBundle.compile(app); //COMMENT BEFORE BUILDING

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(cors());
app.use(helmet());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);

app.get('*', (req, res) => {
    const context = {}
    const markup = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <MainRouter />
            </StaticRouter>
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`
    const js = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>`

    res.status(200).send(template({
        markup: markup,
        css: css,
        js: js
    }))
})

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error": err.name + ": " + err.message})
        console.log(err);
    }
})


export default app;
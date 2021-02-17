import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from "path";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import template from "./../template";

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

    res.status(200).send(template({
        markup: markup
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
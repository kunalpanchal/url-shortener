"use strict"

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


module.exports = (app) => {
    console.log('in express');
    // view engine setup
    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'ejs');

    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

}
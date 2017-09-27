"use strict"
let controller = require('./controllers');

module.exports = (app) => {
    //Setting Up the App
    app.use('/', require('./routes')(controller));
    app.use(controller.handleUrlRetrieval);
}
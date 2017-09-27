"use strict"

const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const mongoose = require('mongoose');
const Links = mongoose.model('Links');

module.exports = (controller) => {
  
  router.get('/', function (req, res, next) { res.render('homepage', { title: 'URL SHORTNER' }); });
  router.get('/generate/:longurl', controller.generate);
  return router;
} 

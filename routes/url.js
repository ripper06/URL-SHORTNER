const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url')
const {handleRedirectURL} = require('../controllers/redirect-url')
const Router = express.Router();

Router.post("/",handleGenerateNewShortUrl);
Router.get("/:shortId",handleRedirectURL);
Router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = Router;
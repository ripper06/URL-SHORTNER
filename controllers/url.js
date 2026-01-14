var nanoId = require('nano-id');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req,res){
    const data = req.body;

    if(!data.url) return res.status(400).json({
         error : 'true',
         message : "url is required!"
        })
    const shortID = nanoId(8);

    await URL.create({
        shortId : shortID,
        redirectURL : data.url,
        visitHistory : [],
        createdBy : req.user._id,
    });

    return res.render('home',{
        id : shortID,
    });

    // return res.status(200).json({
    //     id : shortID,
    //     message : "short url is generated!"
    // })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    if(!result) return res.status(400).json({
        error : "true",
        message : "url not found!"
    })

    return res.status(200).json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
};
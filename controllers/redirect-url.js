const URL = require('../models/url');

async function handleRedirectURL(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory : {
                timestamp : Date.now()
            }
        }
    },
);

if(!entry) return res.status(400).json({
        error : "true",
        message : "url not found!"
    })

res.redirect(entry.redirectURL);
}

module.exports = {
    handleRedirectURL
}

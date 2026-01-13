const User = require('../models/user')
async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    if(!name && !email && !password) return res.status(400).json({
        error : "true",
        message : "missing signup credentials",
    })
    await User.create({
        name : name,
        email : email,
        password : password
    });

    return res.render("home");
}

module.exports = {
    handleUserSignup
}
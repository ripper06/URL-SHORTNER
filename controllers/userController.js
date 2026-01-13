const User = require('../models/user');
const {getUser,setUser} = require('../utils/auth');

const { v4 : uuidv4 } = require('uuid');


async function handleUserSignup(req,res){
    const {name,email,password} = req.body;

    if(!name && !email && !password) return res.status(400).json({
        error : "true",
        message : "missing signup credentials",
    });
    
    await User.create({
        name : name,
        email : email,
        password : password
    });

    return res.render("home");
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;

    if(!email && !password) return res.status(400).json({
        error : "true",
        message : "missing login credentials",
    });
    
    const user = await User.findOne({email,password});

    if(!user) return res.render('login',{
            error : 'Invalid Username or Password'
    });

    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie('uid',sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
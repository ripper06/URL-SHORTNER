const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser')
const {connectToMongoDB} = require('./config/connectDB');
const {restrictToLoggedinUserOnly,checkAuth} = require('./Middleware/auth');

const urlRoutes = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectToMongoDB("mongodb://localhost:27017/url-shortner")
.then(()=>console.log("MongoDB connected successfully!"))
.catch((err)=>console.log(err));

const PORT = 8001;

app.use('/url',restrictToLoggedinUserOnly, urlRoutes);
app.use('/user',checkAuth, userRoutes);
app.use('/',checkAuth, staticRoutes);

app.listen(PORT,()=>{
    console.log(`Server started on port : ${PORT}`);
})
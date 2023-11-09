const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const UrlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth');


const {connectToMongoDB} = require('./connect');

const app = express();
const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => {
    console.log('Connected to mongodb')   
})


app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use('/url',restrictTo(["NORMAL"]),UrlRouter);
app.use('/user',userRouter);
app.use('/',staticRouter);


app.listen(PORT,()=>{
    console.log(`Server Start at PORT ${PORT}`)
})
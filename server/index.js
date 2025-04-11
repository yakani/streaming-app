const express = require('express');
require('dotenv/config');
const app = express();
const conn = require('./dbconfig.js');
const { errorhandeler,notfound} = require('./midleware/error');
const user = require('./routes/User');
const films = require('./routes/Films');
const episode = require('./routes/Episode');
const history = require('./routes/History');
const series = require('./routes/Series');
const auth = require('./routes/Google.js');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended:false , limit:'10mb'}));
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(session({
    secret:process.env.secret,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*60*24
    }
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));
const corsoption = {
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"], 
    credentials: true,
    };
app.use(cors(corsoption));
app.use('/user',user);
app.use('/film',films);
app.use('/episode',episode);
app.use('/history',history);
app.use('/series',series);
app.use('/auth',auth);

conn();

app.use(notfound);
app.use(errorhandeler);
app.listen(7000, ()=>console.log('running'));
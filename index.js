const express = require('express');
const env = require('./config/environment');
const port = 8882;
const app = express();
const logger = require('morgan');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo');

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name : 'Placement_Cell',
    secret : 'somethingYouCanNotCrack',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 10)
    },
    store: mongoStore.create({
        mongoUrl: `mongodb://localhost/${env.db}`,
        autoRemove: 'disabled' // Default
    })
}));

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("Error in connecting server", err);
    }
    console.log("Server is running on port ::", port);
});
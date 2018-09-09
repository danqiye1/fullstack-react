const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user'); // must come before passport require
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

// Middlewares
// Let passport knows to take care of cookies
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
        keys: [keys.cookieKey]
    })
);
// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Server side controller routing
require('./routes/authRoutes')(app);

// 1. Heroku's dynamic port binding
// Heroku environment variables inject or 5000 if in dev environment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
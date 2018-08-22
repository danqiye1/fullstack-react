const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const keys = require('./config/keys');

const app = express();

// 1. Heroku's dynamic port binding
// Heroku environment variables inject or 5000 if in dev environment
const PORT = process.env.PORT || 5000;

// Google OAuth strategy using passport
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // Handle Google OAuth return code
        console.log('Access Token: ', accessToken);
        console.log('Refresh Token: ', refreshToken);
        console.log('Profile: ', profile);
    })
);

// Black magic here: 'google' string is internal identifier for passport to use Google Strategy
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // ask for specific pieces of user's google account
}));

// OAuth callback handler with google return code.
app.get('/auth/google/callback', passport.authenticate('google'))

app.listen(PORT);
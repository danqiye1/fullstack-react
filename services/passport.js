const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const keys = require('../config/keys');

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

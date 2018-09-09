const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy ;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Access to users class
const User = mongoose.model('users');

// Serialize user into a token
passport.serializeUser((user, done) => {
    // Pass in user id to done, this is not profile id
    // This will put user.id into cookie
    done(null, user.id);
});

// Deserialize user from cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Google OAuth strategy using passport
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (profile, done) => {

        // This is asynchronous code for handling google OAuth return
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    // Already have a record with given profile ID, tell passport we are done.
                    done(null, existingUser);
                } else {
                    // User does not exist, make a new user, also asynchronous
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
);

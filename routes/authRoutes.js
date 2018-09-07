const passport = require('passport');

module.exports = (app) => {
    // Black magic here: 'google' string is internal identifier for passport to use Google Strategy
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] // ask for specific pieces of user's google account
    }));

    // OAuth callback handler with google return code.
    app.get('/auth/google/callback', passport.authenticate('google'));
};
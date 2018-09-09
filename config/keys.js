// Check if deployment is to heroku
if (process.env.NODE_ENV === 'production') {
    // We are in production
    module.exports = require('./prod');
} else {
    // We are in development
    module.exports = require('./dev');
}
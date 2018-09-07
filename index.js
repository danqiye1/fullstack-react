const express = require('express');
require('./services/passport');

const app = express();

// Server side controller routing
require('./routes/authRoutes')(app);

// 1. Heroku's dynamic port binding
// Heroku environment variables inject or 5000 if in dev environment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
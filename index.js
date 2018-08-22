const express = require('express');
const app = express();

// 1. Heroku's dynamic port binding
// Heroku environment variables inject or 5000 if in dev environment
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

app.listen(PORT);
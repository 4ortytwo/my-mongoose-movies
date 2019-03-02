const express   = require('express');
const app       = express();

app.get('/', (req,res,next)=> {
    req.signedCookies && req.signedCookies.email ? next() : res.redirect('/login');
});

module.exports = app;
const express   = require('express');
const app       = express();
const User      = require('../models/user');
const bcrypt    = require('bcrypt');

app.get('/', (req, res)=> {
   res.render('login'); 
});

app.post('/', (req, res)=> {
    if (!req.body.email) {
        res.status(411).send('invalid credentials');
    } else {
        User.findOne({email: req.body.email}).then(result =>{
            //do stuff with result
            bcrypt.compare(req.body.password, result.password, (err, equal)=> {
                // res == true
                if(equal) {
                    res.cookie('email', req.body.email, {signed: true}); 
                    res.cookie('username', result.username, {signed: true});
                    debugger
                    // res.status(200).send('logged in')
                    res.redirect("/auth/profile")
                } else {
                    res.status(403).send('invalid credentials.');
                };
            });
        }).catch( err => {
            //error handeler
            res.status(403).send('Invalid credentials');
        })
    };
});

module.exports = app;

// User.findOne({email: req.body.email}, function (err, result ){
//     if
// })
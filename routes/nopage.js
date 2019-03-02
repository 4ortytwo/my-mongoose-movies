const express   = require('express');
const app       = express();

app.get('/', (req, res)=> {
    res.status(404).send('this page does not exist, please contact support');
})

module.exports  = app;
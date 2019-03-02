const express       = require('express');
const app           = express();
const Celebrity     = require('../models/celebrity');

// display all celebrities
app.get('/', (req, res, next)=> {
    Celebrity.find({}, (err, queryResults)=> {
        (err) ? res.status(500).send(err) : res.render('celebrities', {celebrities: queryResults});
    });
});

// render new celebrity page
app.get('/new', (req, res)=> {
    res.render('celebrities/new');
})

// create a new celebrity based on the user input
app.post('/', (req, res)=> {
    let newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    
    Celebrity.create(newCelebrity, err => err ? res.status(500).redirect('/celebrities/new') : res.status(200).redirect('/celebrities'));
});

app.post('/:id/delete', (req, res)=> {
    Celebrity.findByIdAndRemove(req.params.id, (err)=> {
        err ? res.status(500).send(err) : res.redirect('/celebrities');
    })
});

app.get('/:id/edit', (req, res)=> {
    Celebrity.findById(req.params.id, (err, result)=> {
        debugger
        err ? res.status(500).send(err) : res.render('celebrities/edit', {celebrity: result});
    });
});

app.post('/:id', (req, res)=> {
    let updatedCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    };
    Celebrity.findByIdAndUpdate(req.params.id, updatedCelebrity, (err)=> {
        err ? res.status(500).send(err) : res.redirect('/celebrities');
    });
});

app.get('/:id', (req, res)=> {
    Celebrity.findById(req.params.id, (err, celebrity)=> {
        err ? res.status(500).send(err) :res.render('celebrities/show', {celebrity});
    });
});


module.exports = app;
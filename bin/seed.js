const mongoose      = require("mongoose");

mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true}, (err)=> {
    (err) ? console.log(err) 
    : console.log('connected to db')
});

const Celebrity     = require('../models/celebrity');

let celebritySeed   = [
    {
        name: 'Gijs Lebesque',
        occupation: 'Solar Developer',
        catchPhrase: 'FAIR ENOUGH'
    },
    {
        name: 'Jurgen Tonneyck',
        occupation: 'THE TICHA-san',
        catchPhrase:'LESS TALKING MORE CODING'
    },
    {
        name: 'Martin Mihalik',
        occupation: 'SLAVSTACK Divelaper',
        catchPhrase: 'Normalno?'
    }
];

Celebrity.remove({}, ()=> {
    for (let i = 0; i < celebritySeed.length; i +=1) { 
        Celebrity.create(celebritySeed[i]).then(result => {
            console.log("saved")
        }).catch(err => {
            console.log(err)
        })
    }
}).catch(err => {
    console.log(err)
})
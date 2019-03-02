const express       = require ('express');
const app           = express();
const bodyParser    = require ('body-parser');
const mongoose      = require ('mongoose');
const path          = require ('path');
const hbs           = require ('hbs');

//module
const Schema    = mongoose.Schema;




// const Movie = mongoose.model()

// connect to mongodb
mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true}, (err)=> {
    if(err) console.log(err)
    else console.log('connected to db')
});
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })) //don't forget to use this when using bodyParser
hbs.registerPartials(__dirname + 'views/partials');
// const Celebrity = mongoose.model('movies', celebritySchema)

//NEW START

app.use('/auth/*', require('./routes/auth'));
app.use('/', require('./routes/home'));
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/auth/celebrities', require('./routes/celebrities'));
app.use('/*', require('./routes/nopage')); //404 handler

//NEW END


app.get('/movies', (req, res)=> {

    res.send('ok')
})

app.listen(3000, ()=> {
    console.log('listening');
})
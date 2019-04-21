const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('./helpers/auth');

// Sentry DSN
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://98a3eb6bac68444b9a32e45c4ffe0aaf@sentry.io/1432861' });


const app = express();

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());


// Load Routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Passport config
require('./config/passport')(passport);
// DB config
const db = require('./config/database')


// map global promise
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global Variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



// index route
app.get('/', (req, res) =>{
    const title = 'Welcome';
    const titleMain = 'Blackfox Guild'
    res.render('index', {
        titleMain: titleMain,
        title: title
    });
});

//about route
app.get('/about', (req, res) =>{
    const title = 'About';
    const titleMain = 'About';
    const version = '1.1.0';
    const port = process.env.PORT || 5000;
    res.render('about', {
        titleMain: titleMain,
        title: title,
        version: version,
        port: port
    });
});

// use routes
app.use('/ideas', ideas);
app.use('/users', users);















//cms route
app.get('/cms', (req, res) =>{
    res.render('cms');
});

//cms route
app.get('/contact', (req, res) =>{
    const title = 'Contact';
    res.render('contact', {
        title: title
    });
});

//cms route
app.get('/stream', ensureAuthenticated, (req, res) =>{
    const title = 'Streams';
    res.render('stream', {
        title: title
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server started on ${port}...`);
});
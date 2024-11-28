let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localstrategy = passportLocal.Strategy;
let flash = require('connect-flash');

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let ticketsRouter = require('../routes/tickets');

let app = express();

let mongoose = require('mongoose'); // Import the Mongoose module
let DB = require('./db'); // Import the module with the URI

mongoose.connect(DB.URI); // Connect to the database
let mongoDB = mongoose.connection; 
mongoDB.on('error',console.error.bind(console,'Connection Error')) // Display any errors to console
mongoDB.once('open',() => { // If the connection is open, print a success message to console. 
  console.log('MongoDB Connected')
});
mongoose.connect(DB.URI,{useNewURIParser:true,
  useUnifiedTopology:true
});

// express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))
// init flash
app.use(flash());

//init passport
app.use(passport.initialize());
app.use(passport.session());

// create user model instance
let User = require('../models/user_model');

passport.use(new localstrategy(User.authenticate()));


// serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error'
  });
});

module.exports = app;

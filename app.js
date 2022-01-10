var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./Component/index/index');
var usersRouter = require('./routes/users');
var checkoutRouter = require('./Component/checkout/checkout');
var contactRouter = require('./routes/contact');
var productsRouter = require('./Component/product/products');
var signupRouter = require('./routes/register');
var loginRouter = require('./Component/auth/user');
var updateinfoRouter = require('./Component/user/userController');
var changepassRouter = require('./Component/changepassword');
var forgetpassRouter = require('./Component/forgetpassword');
var singleRouter = require('./Component/Single/single');
var apiRouter = require('./Component/comment/api');
const passport = require("./passport");
const {loggedInUserGuard} = require("./middelware/LoggedInUserGuard");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req,res,next){
  res.locals.user = req.user;
  next();

})

app.use('/home', indexRouter);
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/checkout', loggedInUserGuard ,checkoutRouter);
app.use('/contact', contactRouter);
app.use('/products', productsRouter);
app.use('/signup', signupRouter);
app.use('/single', singleRouter);
app.use('/api' ,apiRouter);
app.use('/updateinfo',loggedInUserGuard, updateinfoRouter);
app.use('/changepass',loggedInUserGuard, changepassRouter);
app.use('/forgetpass', forgetpassRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

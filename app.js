const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products/products');
const contactRouter = require('./routes/contact');
const productsDetailRouter = require('./routes/products/productDetail');
const cartRouter =require('./routes/products/cart');
const receiptRouter = require('./routes/products/receipt')

const loginRouter= require('./routes/users/login');
const profileRouter = require('./routes/users/profile');
const registerRouter = require('./routes/users/register');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/contact',contactRouter);

app.use('/cart', cartRouter);
app.use('/receipt', receiptRouter);
app.use('/productDetail',productsDetailRouter);

app.use('/login',loginRouter);
app.use('/profile',profileRouter);
app.use('/register',registerRouter);

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

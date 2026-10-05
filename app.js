require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var authRouter = require('./routes/auth');
var contactosRouter = require('./routes/contactos');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var contactosRouter = require('./routes/contactos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_agenda_contactos_2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Pasar usuario autenticado a todas las plantillas EJS
app.use(function (req, res, next) {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// rutas
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/contactos', contactosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = app => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  return app;
};

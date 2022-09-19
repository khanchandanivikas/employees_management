const express = require('express');

module.exports.config = (app) => {
  //will help us to retrieve body parameters when handling a request.
  app.use(express.json());
};
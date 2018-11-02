// Dependencies
const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const World = function() {
  scope.host = process.env.PUPPETEER_APP_HOST || `http://localhost:5000`;
  scope.driver = puppeteer;
  scope.context = {};
};

setWorldConstructor(World);

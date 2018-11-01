// Dependencies
const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');

const World = function() {
  scope.host = `http://localhost:5000`;
  scope.driver = puppeteer;
  scope.context = {};
};

setWorldConstructor(World);

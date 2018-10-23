// Dependencies
const { Given, When, Then } = require('cucumber');
const {
  visitLiveliness
} = require('../support/actions');

When('I visit the liveliness page', visitLiveliness);

Then('I should see {string}', shouldSee);

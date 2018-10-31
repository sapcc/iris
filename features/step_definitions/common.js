const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const scope = require('../support/scope');

let headless = true;
let slowMo = 5;

async function loadPage(pageUrl) {
  if (!scope.browser)
		scope.browser = await scope.driver.launch({ headless, slowMo });
	scope.context.currentPage = await scope.browser.newPage();
	scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
	const url = scope.host + pageUrl;
	scope.context.response = await scope.context.currentPage.goto(url, {
		waitUntil: 'networkidle2'
	});
  return scope.context.response;
}

When('I go to the system path {string}', function (string) {
  return loadPage("/system/"+string);
});

When('I visit the page {string}', function (string) {
  return loadPage(string);
});

Then('the response status is {int}', async function (status) {
  expect(scope.context.response.status()).to.eql(status)
});

Then('I should see {string}', async function (string) {
  expect(scope.context.response._statusText).to.eql(string);
 });

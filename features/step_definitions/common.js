const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const scope = require('../support/scope');

async function loadPage(pageUrl) {
  // if (!scope.browser)
	// 	scope.browser = await scope.driver.launch({ headless, slowMo });
	scope.context.currentPage = await scope.browser.newPage();
	scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
	const url = scope.host + pageUrl;
	scope.context.currentPageResponse = await scope.context.currentPage.goto(url, {
		waitUntil: 'networkidle2'
	});
  scope.context.currentPageBody = await scope.context.currentPage.content();
  return scope.context.response;
}

When('I go to the system path {string}', function (string) {
  return loadPage("/system/"+string);
});

When('I visit the page {string}', function (string) {
  return loadPage(string);
});

Then('the response status is {int}', async function (status) {
  expect(scope.context.currentPageResponse.status()).to.eql(status)
});

Then('I should see {string}', async function (string) {
  regex = new RegExp( string, 'g' );
  found = (scope.context.currentPageBody).match(regex).length
  expect(found).to.eql(1);
 });

// Dependencies
const { After, Before, AfterAll } = require('cucumber');
const scope = require('./support/scope');

Before(async () => {
  // You can clean up database models here
  if (!scope.browser)
    if (process.env.PUPPETEER_APP_HOST)
      scope.browser = await scope.driver.launch({executablePath: '/usr/bin/chromium-browser', args: ['--disable-dev-shm-usage', '--no-sandbox'], headless: true, slowMo: 5});
    else
      scope.browser = await scope.driver.launch({headless: true, slowMo: 5});
});

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.context.currentPage) {
    // if it has, find all the cookies, and delete them
    const cookies = await scope.context.currentPage.cookies();
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies);
    }
    // close the web page down
    await scope.context.currentPage.close();
    // wipe the context's currentPage value
    scope.context.currentPage = null;
  }
});

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close();
});

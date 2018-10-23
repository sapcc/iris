When('I visit {string}', function (page) {
  if (!scope.browser)
  scope.browser = await scope.driver.launch({ headless, slowMo });
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
  const url = scope.host + page;
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  return visit;
});

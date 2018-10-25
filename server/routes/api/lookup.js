var router = require('express').Router();

// api mock
var fs = require('fs')
var path = require('path');

let rawMockData = fs.readFileSync(path.join(__dirname, '../../lib/mock.json'));
let rawDependenciesData = fs.readFileSync(path.join(__dirname, '../../lib/mock_dependencies.json'));
let jsonMock = JSON.parse(rawMockData);
let jsonDependenciesMock = JSON.parse(rawDependenciesData);

router.get("/", (req, res) =>
  res.json(jsonMock)
);

router.get('/dns/:id', (req, res) => {
   let dnsMock = jsonMock["dnsLookup"]
   dnsMock[0]["name"] = req.params.id
   res.json(dnsMock)
});

router.get("/search/:id", (req, res) => {
  let obj = jsonMock[req.params.id]
  if (obj == null) {
    res.status(404).send('Not found');
  } else {
    res.json(obj)
  }
});

router.get("/search/:id/dependencies", (req, res) => {
  let obj = jsonDependenciesMock[req.params.id]
  if (obj == null) {
    res.status(404).send('Not found');
  } else {
    res.json(obj)
  }
});

module.exports = router;

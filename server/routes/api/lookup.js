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

router.get('/search?:term', (req, res) => {
   let dnsMock = jsonMock["a04c0068-3d0d-4c79-aa56-d95946f03ef7"]
   dnsMock["name"] = req.query.term
   res.json(dnsMock)
});

router.get("/object/:id", (req, res) => {
  let obj = jsonMock[req.params.id]
  if (obj == null) {
    res.status(404).send('Not found');
  } else {
    res.json(obj)
  }
});

router.get("/object/:id/dependencies", (req, res) => {
  let obj = jsonDependenciesMock[req.params.id]
  if (obj == null) {
    res.status(404).send('Not found');
  } else {
    res.json(obj)
  }
});

module.exports = router;

var router = require('express').Router();

// api mock
var fs = require('fs')
var path = require('path');

let rawdata = fs.readFileSync(path.join(__dirname, '../../lib/mock.json'));
let jsonMock = JSON.parse(rawdata);

router.get("/", (req, res) =>
  res.json(jsonMock)
);

router.get('/dns/:id', (req, res) => {
   let dnsMock = jsonMock["dnsLookup"]
   dnsMock[0]["name"] = req.params.id
   res.json(dnsMock)
});

router.get("/search/:id", (req, res) => {
  let projectMock = jsonMock[req.params.id]
  if (projectMock == null) {
    res.status(404).send('Not found');
  } else {
    res.json(projectMock)
  }
});

module.exports = router;

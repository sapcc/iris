var router = require('express').Router();

// api mock
const fs = require('fs')
let file = __dirname + '../../mock.json';
let rawdata = fs.readFileSync(file);
let jsonMock = JSON.parse(rawdata);

router.get("/", (req, res) =>
  res.json(jsonMock)
);

router.get('/dns/:id', (req, res) => {
   dnsMock = jsonMock["dns"]
   dnsMock[0]["name"] = req.params.id
   res.json(dnsMock)
});

router.get("/search/:id", (req, res) => {
  searchValue = req.params.id
  projectMock = jsonMock[searchValue]
  res.json(jsonMock)
});

module.exports = router;

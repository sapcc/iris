const express = require("express");
const os = require("os");
const app = express();
app.use(express.static("dist"));

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/system/liveliness", (req, res) => res.sendStatus(200) );
app.get("/system/readiness", (req, res) => res.sendStatus(200) );

// api mock
const fs = require('fs')
let file = __dirname + '/mock.json';
let rawdata = fs.readFileSync(file);
let jsonMock = JSON.parse(rawdata);
app.get("/api", (req, res) =>
  res.json(jsonMock)
);
app.get('/api/dns/:id', (req, res) => {
   dnsMock = jsonMock["dns"]
   dnsMock[0]["name"] = req.params.id
   res.json(dnsMock)
});
app.get("/api/search/:id", (req, res) => {
  searchValue = req.params.id
  projectMock = jsonMock[searchValue]
  res.json(jsonMock)
});

app.listen(80, () => console.log("Listening on port 80!"));

const express = require("express");
const os = require("os");
const app = express();
app.use(express.static("dist"));

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/system/liveliness", (req, res) => res.sendStatus(200) );
app.get("/system/readiness", (req, res) => res.sendStatus(200) );

app.listen(80, () => console.log("Listening on port 80!"));

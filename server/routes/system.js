var router = require('express').Router();

router.get("/liveliness", (req, res) => res.sendStatus(200) );
router.get("/readiness", (req, res) => res.sendStatus(200) );

module.exports = router;

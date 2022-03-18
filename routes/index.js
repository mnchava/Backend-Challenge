var router = require("express").Router();
const alpha = require("../controllers/alpha");
const flatten = require("../controllers/flatten");
const { quote, quotes } = require("../controllers/quote");

router.get("/", (req, res) => {
  res.send("Jr Back-End Challenge<br>Jesus Salvador Uribe - Marzo 2021");
});

router.put("/alpha", alpha);
router.post("/flatten", flatten);

router.post("/quote", quote);
router.get("/quotes", quotes);

router.use((_, res) => {
  res.status(404).send("404 Not Found.");
});

module.exports = router;

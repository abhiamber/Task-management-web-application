var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({
    title: "Test MongoDB",
    details: "To test, send post request with postman.",
    author: "@amber",
  });
});

module.exports = router;

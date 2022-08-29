var express = require("express");
var router = express.Router();
var query = require("./bigquery");

router.get("/", function (req, res, next) {
  query(`SELECT * 
  FROM \`micro-enigma-359206.dart.dynamic_world_land_cover\``)
    .then((result) => res.send(result))
    .catch((err) => console.error("ERROR:", err));
});

module.exports = router;

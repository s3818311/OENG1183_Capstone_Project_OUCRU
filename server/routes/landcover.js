var express = require("express");
var router = express.Router();

import { query } from "./bigquery.js";

router.get("/", function (req, res, next) {
  query(`SELECT * 
  FROM \`micro-enigma-359206.dart.dynamic_world_land_cover\`
  WHERE \`date\`="2015-2016"`)
    .then((result) => res.send(result))
    .catch((err) => console.error("ERROR:", err));
});

module.exports = router;

var express = require("express");
var router = express.Router();
var query = require("./bigquery");
var fs = require("fs");

const col_filter = (prefix) => {
  var hcmc_id3 = JSON.parse(fs.readFileSync("hcmc_id3_nogeo.json"));
  hcmc_id3 = hcmc_id3.map((ele) => Object.keys(ele)[0]);
  ids = hcmc_id3.filter((id) => id.startsWith(prefix));
  ids = ids.map((id) => id.replace(/\./g, "_"));
  return [ids.join("+"), ids.length];
};

router.get("/", function (req, res, next) {
  let [selected_cols, cnt] = col_filter("VNM.25.1.");
  //   console.log(cnt);
  let query_string = `SELECT \`date\`, (${selected_cols}) / ${cnt} AS \`average\`
  FROM \`micro-enigma-359206.dart.chirps\`
  WHERE \`date\` BETWEEN "2020.01.01" AND "2021.01.01"
  ORDER BY \`date\``;
  //   console.log(query_string);
  query(query_string)
    .then((result) => res.send(result))
    .catch((err) => console.error("ERROR:", err));
});

module.exports = router;

var express = require("express");
var router = express.Router();
var query = require("./bigquery");
var fs = require("fs");

var dis_wards = JSON.parse(fs.readFileSync("districts_wards.json"));

const col_filter = (selected_dis) => {
  ids = dis_wards[selected_dis].map((w) => Object.keys(w)[0]);
  ids = ids.map((id) => id.replace(/\./g, "_"));
  const select_str = `(${ids.join("+")}) / ${ids.length} 
  AS \`${selected_dis
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace("Đ", "D")
    .replace(" ", "")}_avg\``;
  return select_str;
};

router.get("/", function (req, res, next) {
  let select_stmt = Object.keys(dis_wards).map((d) => col_filter(d));
  let query_string = `SELECT \`date\`, ${select_stmt.join(",")}
  FROM \`micro-enigma-359206.dart.chirps\`
  WHERE \`date\` BETWEEN "2020.01.01" AND "2020.02.01"
  ORDER BY \`date\``;
  // console.log(query_string);
  query(query_string)
    .then((result) => res.send(result))
    .catch((err) => console.error("ERROR:", err));
});

module.exports = router;

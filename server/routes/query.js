var express = require("express");
var router = express.Router();
var query = require("./bigquery");

router.post("/", function (req, res, next) {
  const payload = req.body;
  const startDate = payload["startDate"].replace(/-/g, ".");
  const endDate = payload["endDate"].replace(/-/g, ".");
  const sortorder = payload["sortorder"] === "ascending" ? "ASC" : "DESC";
  let cols = "*";
  if (payload["wards"].length != 0) {
    let ws = payload["wards"];
    ws = ["date"].concat(ws);
    ws = ws.map((w) => {
      w = w.replace(/\./g, "_");
      w = "`" + w + "`";
      return w;
    });

    cols = ws.join(",");
  }

  console.log(JSON.stringify(payload));

  query_string = `
    SELECT ${cols}
    FROM \`micro-enigma-359206.dart.${payload["datasource"]}\`
    WHERE \`date\` BETWEEN \"${startDate}\" AND \"${endDate}\"
    ORDER BY \`date\` ${sortorder};
  `;

  console.log(query_string);

  // res.status(200).send("queried");

  query(query_string)
    .then((result) => res.send(result))
    .catch((err) => console.error("ERROR:", err));
});

module.exports = router;

const { BigQuery } = require("@google-cloud/bigquery");
const auth = {
  keyFilename: "micro-enigma-359206-1dd3be2aaa78.json",
  projectId: "micro-enigma-359206",
};

const bigquery = new BigQuery(auth);

async function query(query_string) {
  //   const query = `SELECT *
  //       FROM \`micro-enigma-359206.dart.dynamic_world_land_cover\`
  //       WHERE \`date\`="2015-2016"`;
  const query = query_string;

  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log("Rows:");
  rows.forEach((row) => console.log(row));

  return rows;
}

module.exports = query;

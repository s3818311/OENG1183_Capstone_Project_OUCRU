const { BigQuery } = require("@google-cloud/bigquery");
const auth = {
  projectId: "micro-enigma-359206",
  credentials: {
    client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    ),
  },
};

const bigquery = new BigQuery(auth);

async function query(query_string) {
  const query = query_string;

  const options = {
    query: query,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  return rows;
}

module.exports = query;

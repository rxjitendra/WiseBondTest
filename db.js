const { DefaultAzureCredential } = require("@azure/identity");
const { Client } = require("pg");

async function getPostgresClient() {
    const credential = new DefaultAzureCredential();
    const pgHost = process.env.PGHOST || "wisebond-server.postgres.database.azure.com";
    const database = process.env.PGDATABASE || "postgres";
    const user = process.env.PGUSER || "wisebondtest";
console.log(user);
    const tokenResponse = await credential.getToken("https://ossrdbms-aad.database.windows.net");

    const client = new Client({
        host: pgHost,
        database,
        port: 5432,
        user,
        password: tokenResponse.token,
        ssl: {
            rejectUnauthorized: true,
        },
    });

    await client.connect();
    return client;
}

module.exports = { getPostgresClient };

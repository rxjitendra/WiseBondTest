const { DefaultAzureCredential } = require("@azure/identity");
const { Client } = require("pg");

async function getPostgresClient() {
    const credential = new DefaultAzureCredential();
    const host = process.env["database-host"];
    const database = process.env["database-name"];
    const user = process.env["database-user"];
    const port = process.env["database-port"];

    const tokenResponse = await credential.getToken("https://ossrdbms-aad.database.windows.net");
    const password = tokenResponse.token;

    const client = new Client({
        host,
        database,
        port,
        user,
        password,
        ssl: {
            rejectUnauthorized: true,
        },
    });

    await client.connect();
    return client;
}

module.exports = { getPostgresClient };
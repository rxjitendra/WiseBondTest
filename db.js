const { DefaultAzureCredential } = require("@azure/identity");
const { Client } = require("pg");

async function getPostgresClient() {
    const credential = new DefaultAzureCredential();
    const host = process.env["AZURE_POSTGRESQL_HOST"].trim();
    const database = process.env["AZURE_POSTGRESQL_DATABASE"].trim();
    const user = process.env["AZURE_POSTGRESQL_USER"].trim();
    const port = process.env["AZURE_POSTGRESQL_PORT"].trim();

    const tokenResponse = await credential.getToken("https://ossrdbms-aad.database.windows.net");
    const password = tokenResponse.token;

    console.log(host)
    console.log(database)
    console.log(port)
    console.log(user)
    console.log(password)

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
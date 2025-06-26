const { DefaultAzureCredential } = require("@azure/identity");
const { Client } = require("pg");

async function getPostgresClient() {
    const credential = new DefaultAzureCredential();
    const host = process.env["database_host"];
    const database = process.env["database_name"];
    const user = process.env["database_user"];
    const port = process.env["database_port"];

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
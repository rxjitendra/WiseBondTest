const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// az webapp deploy --resource-group wisebond --name wisebondtest --src-path app.zip --type zip --subscription d5124d60-81c8-4e55-90e1-7dc42de7504a
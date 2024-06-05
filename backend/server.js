"use strict";
/** Server to run memorable-messages app. */
const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => console.log(`Started on httpp://localhost:${PORT}`));

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("express-edge"));

app.set("views", `${__dirname}/src/views`);
require("./src/routes/index")(app);

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;

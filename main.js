const app = require("./connect_express.js");

require("./controllers/calendar");
require("./controllers/login");
require("./controllers/message");
require("./controllers/profile");
require("./controllers/signup");

app.listen(3000);

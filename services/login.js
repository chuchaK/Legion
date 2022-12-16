const query = require("../connect_sql");

module.exports = {
  authorize: async function (req) {
    let email = req.body.email;
    let password = req.body.password;

    const results = await query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (results.length > 0) {
      // Authenticate the user
      req.session.loggedIn = true;
      req.session.email = email;
      req.session.userName = results[0].first_name;
    }
  },

  unauthorize: function (req) {
    req.session.loggedIn = false;
    req.session.email = undefined;
    req.session.userName = undefined;
  },

  checkLoggedIn: function (req) {
    return req.session.loggedIn;
  },
};

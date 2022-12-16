const query = require("../connect_sql");

module.exports = {
  getUserDataFromDB: async function (email) {
    let userData;
    const results = await query("SELECT * FROM users WHERE email = ?", [email]);
    // If there is an issue with the query, output the error
    // If the account exists
    if (results.length > 0) {
      userData = {
        email: results[0].email,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        team_name: results[0].team_name,
      };
    }
    return userData;
  },

  createUser: async function (req) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let team_name = req.body.team_name;
    let email = req.body.email;
    let password = req.body.password;
    let key_team = req.body.key_team;

    const result = query(
      "INSERT INTO users (first_name, last_name, team_name, email, password, key_team) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, team_name, email, password, key_team]
    );

    return result;
  },

  updateUser: function (req) {
    let first_name = req.body?.first_name;
    let last_name = req.body?.last_name;
    let email = req.body?.email;
    let currentEmail = req.session.email;

    const result = query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE email = ?",
      [first_name, last_name, email, currentEmail],
      function (error, res) {
        // If there is an issue with the query, output the error
        return error;
      }
    );

    return result;
  },
};

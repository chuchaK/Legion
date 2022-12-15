const connection = require("../connect_sql");

module.exports = {
  createUser: function (req) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let team_name = req.body.team_name;
    let email = req.body.email;
    let password = req.body.password;
    let key_team = req.body.key_team;

    connection.query(
      "INSERT INTO users (first_name, last_name, team_name, email, password, key_team) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, team_name, email, password, key_team],
      function (error, res) {
        // If there is an issue with the query, output the error
        return error;
      }
    );
  },
};

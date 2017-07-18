const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user    : settings.user,
  password: settings.password,
  database: settings.database,
  host    : settings.hostname,
  port    : settings.port,
  ssl     : settings.ssl
});
const args = process.argv.slice(2);


let lookupPeople = (args) => {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR first_name = $2::text OR last_name = $1::text OR last_name = $2::text", [args[0], args[1]], (err, result) => {
      if (err) {
        return console.error("error running query". err);
      }
      console.log(result.rows[0]);
      client.end();
    });
  });
};
lookupPeople(args);
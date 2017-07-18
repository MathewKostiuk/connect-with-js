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
  console.log('Searching...');
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR first_name = $2::text OR last_name = $1::text OR last_name = $2::text", [args[0], args[1]], (err, result) => {
      if (err) {
        return console.error("error running query". err);
      }
      let person = result.rows[0];
      let birthdateFormat = new Date(person.birthdate).toISOString().slice(0, 10);
      console.log('Found 1 person(s) by the name ' + args[0] + ":");
      console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${birthdateFormat}'`);
      client.end();
    });
  });
};
lookupPeople(args);
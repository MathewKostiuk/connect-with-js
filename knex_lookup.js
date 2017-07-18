const settings = require("./settings"); // settings.json
const userInput = process.argv.slice(2); // CLI Input

const knex = require('knex')({ // Knex setup
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

knex('famous_people').where({
  first_name: userInput[0],
  last_name: userInput[1]
}).select('*')
  .then(function(rows) {
    let person = rows[0];
    let birthdateFormat = new Date(person.birthdate).toISOString().slice(0, 10);
    console.log('Searching...');
    console.log('Found 1 person(s) by the name ' + userInput[0] + ":");
    console.log(`- 1: ${person.first_name} ${person.last_name}, born '${birthdateFormat}'`);
  }).finally(function() {
    knex.destroy();
  });


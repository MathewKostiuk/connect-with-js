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

knex('famous_people')
  .insert([{first_name: userInput[0],
          last_name: userInput[1],
          birthdate: userInput[2]}])
  .returning(['first_name', 'last_name', 'birthdate'])
  .finally(()=> {
      console.log('Entry: Successful');
      knex.destroy();
  })
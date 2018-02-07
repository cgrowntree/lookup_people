const settings = require("./settings"); // settings.json
var moment = require("moment");

var knex = require("knex")({
  client: "pg",
  version: 7.2,
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  },
  useNullAsDefault: true
});

const first = process.argv[2];
const last = process.argv[3];
const birth = process.argv[4];

knex("famous_people")
  .insert({
    first_name: first, 
    last_name: last, 
    birthdate: birth
  })

  .asCallback(() => {
    knex.select("*").from("famous_people").asCallback((err, result) => {
      console.log(result);
      knex.destroy();
    });
  });
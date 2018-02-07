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
  }
});

const input = process.argv[2];

knex.select("*")
  .from("famous_people")
  .where("last_name", "LIKE", input)
  .orWhere("first_name", "LIKE", input)
  .asCallback((err, result) => {
    if (err) {
      return console.error("error running query", err);
    } if (result.length > 0) {
      console.log(`Found ${result.length} person(s) by the name '${input}'`);
      for(const row of result){
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${moment(row.birthdate).format("YYYY-MM-DD")}'`);      
      }
    } else {
      console.log("No Results Found by the name", input);
    }
    knex.destroy();
  });

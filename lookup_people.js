const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require("moment");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name LIKE $1::text OR first_name LIKE $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } if (result.rows.length > 0) {
      console.log("Found", result.rows.length, "person(s) by the name", input);
      for(const row of result.rows){
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${moment(row.birthdate).format("YYYY-MM-DD")}'`);      
      }
    } else {
      console.log("No Results Found by the name", input);
    }
    client.end();
  });
});
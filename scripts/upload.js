const Database = require("arangojs").Database;
const db = new Database("http://127.0.0.1:8529");
db.useBasicAuth("root", "ahoj");

/*
  create and drop database 'test'
*/

// drop db
try {
  db.dropDatabase("test").then(
    () => console.log("dropped"),
    err => {}
  );
} catch (err) {
  console.log("not dropped");
}

// create db
try {
  db.createDatabase("test").then(
    () => console.log("created"),
    err => console.error("Failed to create database:", err)
  );
} catch (err) {
  console.log("not created");
}

const Database = require("arangojs").Database;
const db = new Database("http://127.0.0.1:8529");
db.useBasicAuth("root", "ahoj");

var eventsData = require("./../data/events.json");
var locationsData = require("./../data/locations.json");
var objectsData = require("./../data/objects.json");
var personsData = require("./../data/persons.json");
var statementsData = require("./../data/statements.json");

/*
  create and drop database 'test'
*/

/*
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
*/

db.useDatabase("test");

const tables = [
  {
    name: "events",
    data: eventsData
  },
  {
    name: "locations",
    data: locationsData
  },
  {
    name: "objects",
    data: objectsData
  },
  {
    name: "persons",
    data: personsData
  },
  {
    name: "statements",
    data: statementsData
  }
];

tables.forEach(table => {
  const collection = db.collection(table.name);
  collection.truncate().then(() => {
    collection.save(table.data).then(
      meta => console.log("Document saved:", table.name),
      err => console.error("Failed to save document:", err)
    );
  });
  //collPersons.truncate();
});

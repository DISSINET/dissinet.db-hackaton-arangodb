const Database = require("arangojs").Database;
const db = new Database("http://127.0.0.1:8529");
db.useBasicAuth("root", "ahoj");

var eventsData = require("./../data/events.json");
var locationsData = require("./../data/locations.json");
var objectsData = require("./../data/objects.json");
var personsData = require("./../data/persons.json");
var statementsData = require("./../data/statements.json");

db.useDatabase("test");

const nodeTables = ["event", "location", "person", "object", "statement"];

const eCollection = db.edgeCollection("edges");

const statementCollection = db.collection("statements");
eCollection.truncate().then(() => {
  statementsData.forEach(statement => {
    const subjectTable = nodeTables.find(tname => {
      return statement.subject.toLowerCase().includes(tname);
    });
    const directTable = nodeTables.find(tname => {
      return statement.subject.toLowerCase().includes(tname);
    });
    const indirectTable = nodeTables.find(tname => {
      return statement.subject.toLowerCase().includes(tname);
    });

    //console.log(nodeTable);
    //console.log(subjectCollection);

    statementCollection.byExample({ id: statement.id }).then(cursor => {
      cursor.all().then(statements => {
        if (statements.length) {
          const from = statements[0]._id;

          // subject edge
          if (subjectTable) {
            const subjectCollection = db.collection(subjectTable + "s");

            subjectCollection
              .byExample({ id: statement.subject })
              .then(cursor => {
                cursor.all().then(tos => {
                  if (tos.length) {
                    addEdge({ _from: from, _to: tos[0]._id, type: "subject" });
                  }
                });
              });
          }

          // direct edge
          if (directTable) {
            const directCollection = db.collection(directTable + "s");
            directCollection
              .byExample({ id: statement.direct })
              .then(cursor => {
                cursor.all().then(tos => {
                  if (tos.length) {
                    addEdge({ _from: from, _to: tos[0]._id, type: "direct" });
                  }
                });
              });
          }

          // indirect edge
          if (indirectTable) {
            const indirectCollection = db.collection(indirectTable + "s");

            indirectCollection
              .byExample({ id: statement.indirect })
              .then(cursor => {
                cursor.all().then(tos => {
                  if (tos.length) {
                    addEdge({ _from: from, _to: tos[0]._id, type: "indirect" });
                  }
                });
              });
          }
        }
      });
    });
  });
});

const addEdge = data => {
  //console.log(data);
  eCollection.save(data).then(
    meta => console.log("Document saved: statements"),
    err => console.error("Failed to save document:", err)
  );
};

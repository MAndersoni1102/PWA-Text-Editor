// Importing the openDB method from the idb package to create a database.
import { openDB } from "idb";
// This function is used to initialize the database.
const initdb = async () =>
  // This function is used to open the database and create an object store.
  openDB("jate", 1, {
    // This function is used to upgrade the database and create an object store if it does not exist.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // This function is used to create an object store with a key path and auto increment if it does not exist.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// This function is for updating the database with the content.
export const putDb = async (content) => {
  // This function is used to open the database and create a transaction.
  const jateDb = await openDB("jate", 1);
  // This function is used to create a transaction and get the object store.
  const tx = jateDb.transaction("jate", "readwrite");
  // This function is used to pass the object store to the store variable.
  const store = tx.objectStore("jate");
  // This function is passing the store variable to the request variable, and the request variable is used to put the content in the database.
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data saved to the database:", result);
};

// TODO: Add logic for a method that gets all the content from the database
// This function is for getting all of the data from the database.
export const getDb = async () => {
  console.log("Retrieved all of the data from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("Data retrieved from the database:", result);
  return result?.value;
};

initdb();
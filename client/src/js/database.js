import { openDB } from 'idb';

//Creates database and store
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Stores text content in database
export const putDb = async (content) => {
  const jateDB = await openDB('jate',1)
  const tx = jateDB.transaction('jate','readwrite')
  const store = tx.objectStore('jate')
  const request = store.put({id:1 ,value:content})
  const result = await request
  console.log('Edited Text',result)
};

// gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB('jate',1)
  const tx = jateDB.transaction('jate','readonly')
  const store = tx.objectStore('jate')
  const request = store.get(1)
  const result = await request
  console.log(result)
  return result?.value
};

initdb();

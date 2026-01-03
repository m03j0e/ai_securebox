const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database file in the db folder
const dbPath = path.resolve(__dirname, 'messages.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Serialize runs tasks sequentially
db.serialize(() => {
  // Create the messages table if it doesn't exist
  // We store content and a timestamp. ID is auto-incremented.
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table: ' + err.message);
    } else {
      console.log('Messages table ready.');
    }
  });
});

module.exports = db;

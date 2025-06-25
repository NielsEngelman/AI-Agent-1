const db = require('../config/database');

class MemoryService {
  async initializeTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS chat_memory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return new Promise((resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          console.error('Error initializing chat memory table:', err);
          reject(err);
        } else {
          console.log('Chat memory table initialized');
          resolve();
        }
      });
    });
  }

  async saveMessage(sessionId, role, content) {
    const query = 'INSERT INTO chat_memory (session_id, role, content) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [sessionId, role, content], (err) => {
        if (err) {
          console.error('Error saving message to memory:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getConversationHistory(sessionId, limit = 40) {
    const query = `
      SELECT role, content 
      FROM chat_memory 
      WHERE session_id = ? 
      ORDER BY created_at DESC 
      LIMIT ?
    `;
    return new Promise((resolve, reject) => {
      db.all(query, [sessionId, limit], (err, rows) => {
        if (err) {
          console.error('Error retrieving conversation history:', err);
          reject(err);
        } else {
          // Reverse to get chronological order
          resolve(rows.reverse().map(row => ({
            role: row.role,
            content: row.content
          })));
        }
      });
    });
  }

  async clearOldMessages(daysToKeep = 30) {
    const query = 'DELETE FROM chat_memory WHERE created_at < datetime("now", ? || " days")';
    return new Promise((resolve, reject) => {
      db.run(query, [`-${daysToKeep}`], function(err) {
        if (err) {
          console.error('Error cleaning up old messages:', err);
          reject(err);
        } else {
          console.log(`Cleaned up ${this.changes} old messages`);
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = new MemoryService(); 
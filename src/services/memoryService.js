const pool = require('../config/database');

class MemoryService {
  async initializeTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS chat_memory (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_session_id ON chat_memory(session_id);
      CREATE INDEX IF NOT EXISTS idx_created_at ON chat_memory(created_at);
    `;
    
    try {
      await pool.query(query);
      console.log('Chat memory table initialized');
    } catch (error) {
      console.error('Error initializing chat memory table:', error);
      throw error;
    }
  }

  async saveMessage(sessionId, role, content) {
    const query = 'INSERT INTO chat_memory (session_id, role, content) VALUES ($1, $2, $3)';
    try {
      await pool.query(query, [sessionId, role, content]);
    } catch (error) {
      console.error('Error saving message to memory:', error);
      throw error;
    }
  }

  async getConversationHistory(sessionId, limit = 40) {
    const query = `
      SELECT role, content 
      FROM chat_memory 
      WHERE session_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2
    `;
    
    try {
      const result = await pool.query(query, [sessionId, limit]);
      // Reverse to get chronological order
      return result.rows.reverse().map(row => ({
        role: row.role,
        content: row.content
      }));
    } catch (error) {
      console.error('Error retrieving conversation history:', error);
      throw error;
    }
  }

  async clearOldMessages(daysToKeep = 30) {
    const query = 'DELETE FROM chat_memory WHERE created_at < NOW() - INTERVAL $1 DAY';
    try {
      const result = await pool.query(query, [daysToKeep]);
      console.log(`Cleaned up ${result.rowCount} old messages`);
      return result.rowCount;
    } catch (error) {
      console.error('Error cleaning up old messages:', error);
      throw error;
    }
  }
}

module.exports = new MemoryService(); 
const fs = require('fs');
const path = require('path');

class MessageService {
  async sendMessageToHub(sessionId, message, agentId) {
    // Log het bericht lokaal in een bestand (optioneel kun je dit uitbreiden)
    const logPath = path.join(__dirname, '../../messages.log');
    const logEntry = `${new Date().toISOString()} | sessionId: ${sessionId} | agentId: ${agentId} | message: ${message}\n`;
    fs.appendFileSync(logPath, logEntry);
    return { success: true, message: 'Message logged locally' };
  }
}

module.exports = new MessageService(); 
const axios = require('axios');

class MessageService {
  async sendMessageToHub(sessionId, message, agentId) {
    const url = 'https://mkihypczxepmedfgpoqq.supabase.co/functions/v1/send-message';
    
    try {
      const response = await axios.post(url, {
        sessionId,
        message,
        agentId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message to hub:', error);
      throw new Error('Failed to send message to hub');
    }
  }
}

module.exports = new MessageService(); 
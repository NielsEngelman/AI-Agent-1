const openaiService = require('../services/openaiService');
const memoryService = require('../services/memoryService');
const messageService = require('../services/messageService');

class AgentController {
  async processWebhook(req, res) {
    try {
      const { body } = req.body;
      const { message, sessionId, agentId } = body;

      console.log(`Processing message for session ${sessionId}: ${message}`);

      // Get conversation history
      const conversationHistory = await memoryService.getConversationHistory(sessionId);

      // Generate AI response
      const aiResponse = await openaiService.generateResponse(message, conversationHistory);

      // Save user message and AI response to memory
      await memoryService.saveMessage(sessionId, 'user', message);
      await memoryService.saveMessage(sessionId, 'assistant', aiResponse);

      // Send response back to hub
      await messageService.sendMessageToHub(sessionId, aiResponse, agentId);

      console.log(`Response sent for session ${sessionId}`);

      res.status(200).json({ 
        success: true, 
        message: 'Message processed successfully',
        sessionId 
      });

    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ 
        error: 'Failed to process message',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new AgentController(); 
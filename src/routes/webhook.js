const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { validateWebhookPayload } = require('../middleware/validation');

// Webhook endpoint matching n8n path structure
router.post('/f3de5429-2a5e-45f2-a2eb-f69b61feb3f8', validateWebhookPayload, agentController.processWebhook);

module.exports = router; 
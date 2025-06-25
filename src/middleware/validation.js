const validateWebhookPayload = (req, res, next) => {
  const { body } = req.body;
  
  if (!body) {
    return res.status(400).json({ error: 'Missing body in request' });
  }

  if (!body.message) {
    return res.status(400).json({ error: 'Missing message in body' });
  }

  if (!body.sessionId) {
    return res.status(400).json({ error: 'Missing sessionId in body' });
  }

  if (!body.agentId) {
    return res.status(400).json({ error: 'Missing agentId in body' });
  }

  next();
};

module.exports = {
  validateWebhookPayload
}; 
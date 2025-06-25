require('dotenv').config();
const app = require('./src/app');
const memoryService = require('./src/services/memoryService');

const PORT = process.env.PORT || 3000;

// Initialize database tables
async function startServer() {
  try {
    await memoryService.initializeTable();
    
    app.listen(PORT, () => {
      console.log(`🚀 Makelaardij AI Agent running on port ${PORT}`);
      console.log(`📍 Webhook URL: http://localhost:${PORT}/webhook/f3de5429-2a5e-45f2-a2eb-f69b61feb3f8`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer(); 
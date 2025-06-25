# Makelaardij Kerremans AI Agent

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/NielsEngelman/AI-Agent-1&cloudshell_tutorial=cloudshell.tutorial)
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FNielsEngelman%2FAI-Agent-1%2Fmain%2Fazuredeploy.json)

> **Google Cloud:** Klik op de Cloud Shell knop om direct te deployen naar Cloud Run. Volg de stappen in de Cloud Shell tutorial.
>
> **Azure:** Klik op de Deploy to Azure knop om direct te deployen naar Azure Web App. Vul de gevraagde parameters in.

---

Een Node.js/Express AI agent die via webhooks communiceert met de AI Collega's Hub en gebruikers helpt bij het opstellen van wervende woningadvertenties.

## Features
- Webhook endpoint voor AI Collega's Hub
- OpenAI integratie voor tekstgeneratie
- PostgreSQL-gebaseerde chat memory
- Veilige en schaalbare Express setup
- Eenvoudig uitbreidbaar

## Installatie
1. **Clone het project**
   ```bash
   git clone https://github.com/NielsEngelman/AI-Agent-1.git
   cd AI-Agent-1
   ```
2. **Installeer dependencies:**
   ```bash
   npm install
   ```
3. **Maak een `.env` bestand aan in de root:**
   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   DATABASE_URL=your_postgres_connection_string
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   NODE_ENV=development
   ```
4. **Configureer je PostgreSQL database** (zie `src/config/database.js`)

## Gebruik
- **Start de server in development mode:**
  ```bash
  npm run dev
  ```
- **Webhook endpoint:**
  - POST naar: `http://localhost:3000/webhook/f3de5429-2a5e-45f2-a2eb-f69b61feb3f8`
  - Payload voorbeeld:
    ```json
    {
      "body": {
        "message": "Hallo, ik wil graag hulp bij het maken van een advertentie",
        "sessionId": "test-session-123",
        "agentId": "makelaardij-agent"
      }
    }
    ```
- **Health check:**
  - GET: `http://localhost:3000/health`

## Testen
Test de webhook endpoint met bijvoorbeeld curl:
```bash
curl -X POST http://localhost:3000/webhook/f3de5429-2a5e-45f2-a2eb-f69b61feb3f8 \
  -H "Content-Type: application/json" \
  -d '{
    "body": {
      "message": "Hallo, ik wil graag hulp bij het maken van een advertentie",
      "sessionId": "test-session-123",
      "agentId": "makelaardij-agent"
    }
  }'
```

## Deployment
- Zet environment variabelen op je hosting platform
- Configureer PostgreSQL database
- Zorg voor HTTPS in productie
- Implementeer rate limiting indien nodig
- Voeg logging/monitoring toe (bijv. Winston)

## Uitbreidingsmogelijkheden
- Authenticatie voor webhook endpoints
- Message queueing (bijv. Redis/Bull)
- File upload functionaliteit
- A/B testing voor prompts
- Analytics en usage tracking

## Belangrijk
- Vervang alle placeholder waarden in `.env` met echte credentials
- Test alle endpoints voordat je naar productie gaat
- Implementeer proper error handling en logging
- Zorg voor database backup strategie

---

**Vragen of bijdragen?** Neem contact op met het Makelaardij Kerremans team. 
# Makelaardij Kerremans AI Agent

[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/NielsEngelman/AI-Agent-1&cloudshell_tutorial=cloudshell.tutorial)
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FNielsEngelman%2FAI-Agent-1%2Fmain%2Fazuredeploy.json)

> **Google Cloud:** Klik op de Cloud Shell knop om direct te deployen naar Cloud Run. Volg de stappen in de Cloud Shell tutorial.
>
> **Azure:** Klik op de Deploy to Azure knop om direct te deployen naar Azure Web App. Vul de gevraagde parameters in.

---

Een volledig self-contained Node.js/Express AI agent die via webhooks communiceert en gebruikers helpt bij het opstellen van wervende woningadvertenties. **Geen externe database of API nodig!**

## Features
- Webhook endpoint voor AI Collega's Hub
- OpenAI integratie voor tekstgeneratie
- Lokaal SQLite-gebaseerde chat memory (bestand: `chat_memory.db`)
- Berichten worden lokaal gelogd (`messages.log`)
- Veilige en schaalbare Express setup
- Eenvoudig te installeren en te deployen

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
   NODE_ENV=development
   ```

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

## Data opslag
- Chat memory wordt opgeslagen in `chat_memory.db` (SQLite, lokaal bestand)
- Alle verstuurde berichten worden gelogd in `messages.log`

## Pushen naar GitHub
1. Voeg je wijzigingen toe:
   ```bash
   git add .
   git commit -m "Jouw commit boodschap"
   git push origin main
   ```

## (Her)installeren via README
- Volg de installatie-instructies hierboven of klik op de Cloud Shell/Azure knop bovenaan deze README voor one-click deployment.

## Belangrijk
- Alleen een OpenAI API key is vereist.
- Geen externe database of API nodig.
- Alles draait lokaal of in je eigen cloudomgeving.

---

**Vragen of bijdragen?** Neem contact op met het Makelaardij Kerremans team. 
# Gebruik een officiële Node.js runtime als basis image
FROM node:20-alpine

# Maak app directory
WORKDIR /usr/src/app

# Kopieer package.json en package-lock.json
COPY package*.json ./

# Installeer dependencies
RUN npm install --production

# Kopieer de rest van de app
COPY . .

# Expose de poort
EXPOSE 3000

# Start de app
CMD [ "npm", "start" ] 
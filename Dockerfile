FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/STARBOYT20/SHARK-MD.git /root/shark-md-bot

# Set working directory
WORKDIR /root/shark-md-bot

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 9090

# Start the bot
CMD ["npm", "start"]

FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm run build

# Bundle app source
COPY . .

#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]

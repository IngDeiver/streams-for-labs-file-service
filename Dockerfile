FROM node:15.11.0

WORKDIR /usr/streamsforlab/file-service


COPY package*.json ./

RUN npm install


# Bundle app source
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
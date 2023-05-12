FROM node:19

RUN npm i -g next
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies

COPY package*.json ./

COPY . .

RUN npm i && npm run build

EXPOSE 8080
CMD [ "npm", "run", "start" ]

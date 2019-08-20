FROM node:10.15.3-alpine

#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

#USER node

#COPY --chown=node:node . .

COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build

#COPY --chown=node:node . .
COPY . .

CMD [ "node", "app.js" ]
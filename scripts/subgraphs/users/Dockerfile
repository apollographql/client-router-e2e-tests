FROM node:22-bullseye

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY users.js .
COPY users.graphql .

CMD [ "node", "users.js" ]

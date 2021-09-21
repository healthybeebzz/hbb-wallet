FROM node:14
WORKDIR /hbb-wallet/src/index.ts

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", " ." ]


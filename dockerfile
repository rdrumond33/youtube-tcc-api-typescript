FROM node:lts-stretch-slim

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn","start" ]

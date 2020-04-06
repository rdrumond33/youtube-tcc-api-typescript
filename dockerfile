FROM node
WORKDIR /app
COPY package.json package.json 
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3333
CMD [ "yarn","start" ]
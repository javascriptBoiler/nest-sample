FROM node:12-alpine

RUN apk --no-cache --update add make g++

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn db-migrate
RUN yarn build

EXPOSE 3000

CMD [ "node", "./dist/main" ]
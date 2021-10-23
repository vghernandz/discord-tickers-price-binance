FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

CMD ["yarn", "start"]

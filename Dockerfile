FROM node:alpine

COPY src /app/src
COPY test /app/test
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.build.json /app/tsconfig.build.json

WORKDIR /app

RUN npm install --location=global yarn --force

RUN yarn install

RUN yarn build

EXPOSE 3000:3000
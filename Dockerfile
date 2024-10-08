FROM node:22.1.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

EXPOSE 4100

CMD ["npm", "run", "start:prod"]

FROM node:lts-alpine3.19

WORKDIR /app

COPY package.json /app/
COPY public/ /app/public
COPY src/ /app/src

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
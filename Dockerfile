FROM node:14.19.3-alpine3.16 AS development

WORKDIR /usr/src/app

COPY package.json ./

# RUN npm install glob rimraf

RUN npm install

COPY . .

# RUN npm run build

# CMD ["node", "dist/main"]
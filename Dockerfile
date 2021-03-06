FROM node:12.16.3
WORKDIR /usr/src/app
ENV PORT 3000
ENV HOST 0.0.0.0
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD npm start
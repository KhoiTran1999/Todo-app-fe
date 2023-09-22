FROM node:18

WORKDIR /todo-app-fe

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
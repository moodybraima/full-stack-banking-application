FROM node:20
# Create app directory
WORKDIR /usr/src/app
# Inwstall app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ['npm',  "run", "dev"]

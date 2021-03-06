FROM node:stretch

ENV PORT 8080
ENV MONGO_HOST easytax
ENV MONGO_PORT 27017
ENV EASYTAX_DOMAIN preprod.easytax.tech

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "bin/www" ]
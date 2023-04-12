FROM node:16.13.0-alpine as build-step

WORKDIR /src/frontend
COPY package.json /src/frontend
RUN rm -rf package-lock.json
RUN npm install -g npm@8.1.0
RUN npm install yarn --legacy-peer-deps
RUN yarn install
COPY . /src/frontend
EXPOSE 3000
CMD ["npm", "start"]

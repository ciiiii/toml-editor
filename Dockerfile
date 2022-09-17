FROM node:slim

COPY . .

LABEL "com.github.actions.icon"="file"
LABEL "com.github.actions.color"="blue"

RUN yarn install
RUN yarn run build

ENTRYPOINT ["node", "/dist/src/index.js"]
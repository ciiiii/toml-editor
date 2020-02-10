FROM node:slim

COPY . .

LABEL "com.github.actions.icon"="file"
LABEL "com.github.actions.color"="blue"

RUN yarn
RUN yarn run build

ENTRYPOINT ["node", "dist/index.js"]
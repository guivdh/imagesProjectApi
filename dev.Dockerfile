FROM node:12

RUN apt-get update

CMD yarn && yarn run start:dev --preserveWatchOutput

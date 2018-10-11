FROM node:8.12-alpine AS iris

RUN apk --no-cache add git ca-certificates

ADD . /home/app/webapp
WORKDIR /home/app/webapp

RUN yarn
RUN yarn build
CMD yarn production

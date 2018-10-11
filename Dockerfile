FROM node:8.12-alpine AS iris

RUN apk --no-cache add git ca-certificates

ADD . /home/app/webapp
WORKDIR /home/app/webapp

EXPOSE 8080

RUN yarn
RUN yarn build
RUN yarn server

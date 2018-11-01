FROM node:8.12-alpine AS iris

RUN apk --no-cache add git ca-certificates make

ADD . /home/app/webapp
WORKDIR /home/app/webapp

ARG FONT_AWESOME_AUTH_TOKEN
RUN make font-awesome-file auth-token=$FONT_AWESOME_AUTH_TOKEN

RUN yarn

CMD yarn build && yarn production

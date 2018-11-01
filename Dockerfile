FROM node:8.12-alpine AS iris

RUN apk --no-cache add git ca-certificates make

ADD . /home/app/webapp
WORKDIR /home/app/webapp

RUN make font-awesom-file auth-token=$font_awesom_auth_token

RUN yarn

CMD yarn build && yarn production

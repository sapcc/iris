IMAGE := sapcc/iris
TEST-IMAGE := hub.global.cloud.sap/monsoon/nodebuild
DATE     := $(shell date +%Y%m%d%H%M%S)
VERSION  ?= v$(DATE)
UNIT-VERSION := 8.12
BUILD_ARGS = --build-arg VERSION=$(VERSION)

.PHONY: build, start, unit-test, integration-test, font-awesom-file, build-test, push-test

build:
	docker build $(BUILD_ARGS) -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

start:
	docker run -p 80:80 -t -i $(IMAGE):latest

unit-test:
	yarn --dev && yarn test

integration-test:
	yarn --dev && yarn link puppeteer && yarn integration

font-awesom-file:
	@touch ./.npmrc && echo "@fortawesome:registry=https://npm.fontawesome.com/" > ./.npmrc && echo //npm.fontawesome.com/:_authToken=$(auth-token) >> ./.npmrc

build-test:
	docker build -t $(TEST-IMAGE):$(UNIT-VERSION) -f ./ci/Dockerfile.test .

push-test:
	docker push $(TEST-IMAGE):$(UNIT-VERSION)

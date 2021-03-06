IMAGE := sapcc/iris
TEST-IMAGE := keppel.eu-de-1.cloud.sap/ccloud/nodebuild
DATE     := $(shell date +%Y%m%d%H%M%S)
VERSION  ?= v$(DATE)
UNIT-VERSION := 8.12
BUILD_ARGS = --build-arg VERSION=$(VERSION)

.PHONY: build, start, unit-test, integration-test, font-awesome-file, build-test, push-test

build:
	docker build $(BUILD_ARGS) -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

start:
	docker run -p 80:80 -t -i $(IMAGE):latest

unit-test:
	yarn --dev && yarn test

integration-test:
	yarn link puppeteer && yarn --dev && yarn integration

font-awesome-file:
	@[ -f ./.npmrc ] || (touch ./.npmrc && echo "@fortawesome:registry=https://npm.fontawesome.com/" > ./.npmrc && echo //npm.fontawesome.com/:_authToken=$(auth-token) >> ./.npmrc)

build-test:
	docker build -t $(TEST-IMAGE):$(UNIT-VERSION) -f ./Dockerfile.test .

push-test:
	docker push $(TEST-IMAGE):$(UNIT-VERSION)


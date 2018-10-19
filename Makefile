IMAGE := sapcc/iris
UNIT-IMAGE := hub.global.cloud.sap/monsoon/nodebuild
DATE     := $(shell date +%Y%m%d%H%M%S)
VERSION  ?= v$(DATE)
UNIT-VERSION := 8.12
BUILD_ARGS = --build-arg VERSION=$(VERSION)

.PHONY: build, start, unit-test, build-unit, push-unit

build:
	docker build $(BUILD_ARGS) -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

start:
	docker run -p 80:80 -t -i $(IMAGE):latest

unit:
	yarn --dev && yarn test

build-unit:
	docker build -t $(UNIT-IMAGE):$(UNIT-VERSION) -f ./ci/Dockerfile.unit .

push-unit:
	docker push $(UNIT-IMAGE):$(UNIT-VERSION)

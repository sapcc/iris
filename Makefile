IMAGE := sapcc/iris
DATE     := $(shell date +%Y%m%d%H%M%S)
VERSION  ?= v$(DATE)
BUILD_ARGS = --build-arg VERSION=$(VERSION)

.PHONY: build, start

build:
	docker build $(BUILD_ARGS) -t $(IMAGE):$(VERSION) -t $(IMAGE):latest .

start:
	docker run -p 80:80 -t -i $(IMAGE):latest

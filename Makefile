
build: node_modules
	./node_modules/.bin/dato dump
	node build.js $(dev)

node_modules: package.json
	npm install

.PHONY: build

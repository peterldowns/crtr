.PHONY: webpack-dev

all: dev

server:
	./manage.py runserver 8080

dev:
	./node_modules/webpack/bin/webpack.js -w

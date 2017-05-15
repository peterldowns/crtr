.PHONY: webpack-dev clean

default: dev

clean:
	find . -type f -name "*.pyc" -delete

venv venv/bin/activate: requirements.txt clean
	test -d venv || virtualenv venv --no-site-packages
	. venv/bin/activate && pip install -r requirements.txt

server: venv/bin/activate
	. venv/bin/activate && ./manage.py runserver 8080

dev:
	./node_modules/webpack/bin/webpack.js -w

prod: venv/bin/activate
	. venv/bin/activate && PRODUCTION=1 nohup ./server.py script args >stdout.log 2>stderr.log&

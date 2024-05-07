all: build

build:
	npx tsc -p tsconfig.json

eslint:
	npx eslint src tst html

parcel:
	npx parcel html/index.html --no-cache

test:
	npx jest

run: build
	@node --experimental-specifier-resolution=node dist/main.js

watch:
	npx tsc -w -p tsconfig.json

clean:
	rm -f *~

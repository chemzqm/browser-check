
build: components index.js browser-check.css
	@component build
	@touch build

start:
	@component serve &

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean start

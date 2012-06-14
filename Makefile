ALL_TESTS = $(shell find test/ -name '*.test.js') 

run-tests:
	@./node_modules/vows/bin/vows

test:
	@$(MAKE) NODE_PATH=lib TESTS="$(ALL_TESTS)" run-tests

test-cov:
	@TESTFLAGS=--cov $(MAKE) test

profile:
	@PROFILEFLAGS='--prof --trace-opt --trace-bailout --trace-deopt' $(MAKE) bench

.PHONY: test profile

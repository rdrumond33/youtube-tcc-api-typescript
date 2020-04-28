ifneq ("$(wildcard .env)","")
        include  .env
        export
endif

run-dev: setup
	yarn start:dev

run: setup build
	yarn start

build: setup
	yarn build

setup: .make.setup
.make.setup:
	yarn install
	@touch .make.setup

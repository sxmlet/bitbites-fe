.PHONY: build publish-images

run: build
	@docker-compose up -d

build:
	@docker-compose build

publish-images:
	@${REPO:? Repository must be specified}
	@docker push ${REPO}/bitbites-fe

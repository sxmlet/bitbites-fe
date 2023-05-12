.PHONY: build publish-images

run: build
	@docker-compose up -d

build:
	@${TAG:? Tag required}
	@docker-compose -f docker-compose.build.yml build

publish-images:
	@${TAG:? Tag required}
	@${REPO:? Repository must be specified}
	@docker push ${REPO}/bitbites-fe:${TAG}

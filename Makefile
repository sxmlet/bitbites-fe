.PHONY: build publish-images

SERVICE=bitbites-fe

run: build
	@docker-compose up -d

build:
	@${TAG:? Tag required}
	@docker-compose -f docker-compose.build.yml build

push:
	@${TAG:? Tag required}
	@${REPO:? Repository must be specified}
	@docker tag ${REPO}/${SERVICE}:${TAG} ${REPO}/${SERVICE}:latest
	@docker push ${REPO}/${SERVICE}:${TAG}
	@docker push ${REPO}/${SERVICE}:latest
